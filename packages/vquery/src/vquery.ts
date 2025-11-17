import { Dataset } from './dataset'
import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'
import { DatasetSchema, TidyDatum, DataSourceType, DataType } from './types'
import { DataSourceBuilder } from 'src/dataSourceBuilder'

function mapDataTypeToDuckDB(type: DataType): string {
  switch (type) {
    case 'number':
      return 'DOUBLE'
    case 'string':
      return 'VARCHAR'
    case 'date':
      return 'DATE'
    case 'datetime':
      return 'TIMESTAMP'
    case 'timestamp':
      return 'TIMESTAMP'
    default:
      return 'VARCHAR'
  }
}

export class VQuery {
  private duckDB: DuckDB
  private indexedDB: IndexedDB
  private isInitialized: boolean = false

  constructor(dbName: string = 'vquery') {
    this.duckDB = new DuckDB()
    this.indexedDB = new IndexedDB(dbName)
  }

  private async ensureInitialized() {
    if (!this.isInitialized) {
      await this.duckDB.init()
      await this.indexedDB.open()
      this.isInitialized = true
    }
  }

  /**
   * 创建数据集，根据表结构和数据，存储信息到indexedDB
   */
  public async createDataset(
    datasetId: string,
    data: string | ArrayBuffer | Blob | TidyDatum[],
    type: DataSourceType,
    datasetSchema: DatasetSchema,
  ) {
    await this.ensureInitialized()
    const dataSource = await DataSourceBuilder.from(type, data).build()
    await this.indexedDB.writeDataset(datasetId, dataSource, datasetSchema)
  }

  /**
   * 修改数据集，更新信息到indexedDB内
   */
  public async updateDataset(
    datasetId: string,
    data: string | ArrayBuffer | Blob | TidyDatum[],
    type: DataSourceType,
    datasetSchema: DatasetSchema,
  ) {
    await this.ensureInitialized()
    const dataSource = await DataSourceBuilder.from(type, data).build()
    await this.indexedDB.writeDataset(datasetId, dataSource, datasetSchema)
  }

  /**
   * 删除数据集，从indexdb移除数据集
   */
  public async deleteDataset(datasetId: string) {
    await this.ensureInitialized()
    await this.indexedDB.deleteDataset(datasetId)
  }

  /**
   * 获取所有可用数据集
   */
  public async listDatasets() {
    await this.ensureInitialized()

    return this.indexedDB.listDatasets()
  }

  /**
   * 连接数据集，返回数据集信息，从indexedDB获取表结构，使用DuckDB在内存中创建表
   */
  public async connectDataset(datasetId: string) {
    await this.ensureInitialized()
    const datasetInfo = await this.indexedDB.readDataset(datasetId)
    if (!datasetInfo) {
      throw new Error(`Dataset ${datasetId} not found`)
    }
    const { dataSource, datasetSchema } = datasetInfo

    // 根据dataSource类型处理数据加载
    const readFunctionMap: Partial<Record<DataSourceType, string>> = {
      csv: 'read_csv_auto',
      json: 'read_json_auto',
      xlsx: 'read_excel',
      parquet: 'read_parquet',
    }
    const readFunction = readFunctionMap[dataSource.type]
    if (!readFunction) {
      throw new Error(`Unsupported dataSource type: ${dataSource.type}`)
    }

    // 注册文件到DuckDB - 只处理文件类型，不处理数组
    await this.duckDB.writeFile(datasetId, dataSource.blob)

    const columnsStruct = `{${datasetSchema.columns
      .map((c) => `'${c.name}': '${mapDataTypeToDuckDB(c.type)}'`)
      .join(', ')}}`
    const columnNames = datasetSchema.columns.map((c) => `"${c.name}"`).join(', ')

    // 创建视图
    const createViewSql = `CREATE OR REPLACE VIEW "${datasetId}" AS SELECT ${columnNames} FROM ${readFunction}('${datasetId}', columns=${columnsStruct})`
    await this.duckDB.query(createViewSql)

    return new Dataset(this.duckDB, datasetId, datasetSchema.datasetAlias || datasetId)
  }
}
