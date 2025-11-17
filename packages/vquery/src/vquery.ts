import { Dataset } from './dataset'
import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'
import { DatasetSchema, TidyDatum, DataSourceType } from './types'
import { DataSourceBuilder } from 'src/dataSourceBuilder'

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
    switch (dataSource.type) {
      case 'csv': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        await this.duckDB.writeFile(datasetId, dataSource.blob)
        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_csv_auto('${datasetId}')`
        await this.duckDB.query(createViewSql)
        break
      }
      case 'json': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        await this.duckDB.writeFile(datasetId, dataSource.blob)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_json_auto('${datasetId}')`
        await this.duckDB.query(createViewSql)
        console.log('debug schema', await this.duckDB.getSchema(datasetId))
        break
      }
      case 'xlsx': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        await this.duckDB.writeFile(datasetId, dataSource.blob)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_excel('${datasetId}')`
        await this.duckDB.query(createViewSql)
        break
      }
      case 'parquet': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        await this.duckDB.writeFile(datasetId, dataSource.blob)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_parquet('${datasetId}')`
        await this.duckDB.query(createViewSql)
        break
      }
      default: {
        throw new Error(`Unsupported dataSource type: ${(dataSource as { type: string }).type}`)
      }
    }

    return new Dataset(this.duckDB, datasetId, datasetSchema.datasetAlias || datasetId)
  }
}
