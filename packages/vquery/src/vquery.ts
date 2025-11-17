import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'
import { DatasetSchema, DataSource, DataType, TidyDatum } from './types'

class Dataset {
  private duckDB: DuckDB
  private datasetId: string
  private tableName: string

  constructor(duckDB: DuckDB, datasetId: string, tableName: string) {
    this.duckDB = duckDB
    this.datasetId = datasetId
    this.tableName = tableName
  }

  public async queryBySQL(sql: string) {
    const start = performance?.now?.()?.toFixed(3) ?? Date.now().toFixed(3)
    const result = await this.duckDB.query(sql)
    const end = performance?.now?.()?.toFixed(3) ?? Date.now().toFixed(3)
    return {
      ...result,
      performance: {
        startAt: start,
        endAt: end,
        duration: Number(end) - Number(start),
      },
    }
  }

  public async disConnect() {
    // 暂时没有需要释放的资源
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
  public async createDataset(datasetId: string, dataSource: DataSource, datasetSchema: DatasetSchema) {
    await this.ensureInitialized()
    await this.indexedDB.writeDataset(datasetId, dataSource, datasetSchema)
  }

  /**
   * 修改数据集，更新信息到indexedDB内
   */
  public async updateDataset(datasetId: string, dataSource: DataSource, datasetSchema: DatasetSchema) {
    await this.ensureInitialized()
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
      case 'array': {
        // 为数组数据创建临时表
        const tempTableName = `${datasetId}_temp`
        await this.createTableFromSchema(tempTableName, datasetSchema)

        // 插入数据
        await this.insertTidyData(tempTableName, dataSource.value as TidyDatum[], datasetSchema)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM ${tempTableName}`
        await this.duckDB.query(createViewSql)

        // 删除临时表
        await this.duckDB.query(`DROP TABLE ${tempTableName}`)
        break
      }
      case 'csv': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        const fileValue = dataSource.value as string | ArrayBuffer | Uint8Array | Blob
        await this.duckDB.writeFile(datasetId, fileValue)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_csv_auto('${datasetId}')`
        await this.duckDB.query(createViewSql)
        break
      }
      case 'json': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        const fileValue = dataSource.value as string | ArrayBuffer | Uint8Array | Blob
        await this.duckDB.writeFile(datasetId, fileValue)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_json_auto('${datasetId}')`
        await this.duckDB.query(createViewSql)
        break
      }
      case 'xlsx': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        const fileValue = dataSource.value as string | ArrayBuffer | Uint8Array | Blob
        await this.duckDB.writeFile(datasetId, fileValue)

        // 创建视图
        const createViewSql = `CREATE OR REPLACE VIEW ${datasetId} AS SELECT * FROM read_excel('${datasetId}')`
        await this.duckDB.query(createViewSql)
        break
      }
      case 'parquet': {
        // 注册文件到DuckDB - 只处理文件类型，不处理数组
        const fileValue = dataSource.value as string | ArrayBuffer | Uint8Array | Blob
        await this.duckDB.writeFile(datasetId, fileValue)

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

  /**
   * 根据Schema创建DuckDB表
   */
  private async createTableFromSchema(datasetId: string, schema: DatasetSchema) {
    const columnDefinitions = schema.columns
      .map((col) => `${col.name} ${this.mapDataTypeToDuckDBType(col.type)}`)
      .join(', ')
    const createTableSql = `CREATE OR REPLACE TABLE ${datasetId} (${columnDefinitions})`
    await this.duckDB.query(createTableSql)
  }

  /**
   * 映射DataType到DuckDB类型
   */
  private mapDataTypeToDuckDBType(type: DataType): string {
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

  /**
   * 插入tidyData到DuckDB表
   */
  private async insertTidyData(datasetId: string, data: TidyDatum[], schema: DatasetSchema) {
    if (data.length === 0) return

    const columnNames = schema.columns.map((col) => col.name).join(', ')

    for (const row of data) {
      // 处理每个值，根据类型转换为合适的SQL表示
      const values = schema.columns.map((col) => {
        const value = row[col.name]
        if (value === null || value === undefined) {
          return 'NULL'
        } else if (typeof value === 'string') {
          // 转义字符串中的单引号
          return `'${value.replace(/'/g, "''")}'`
        } else if (typeof value === 'number' || typeof value === 'bigint') {
          return value.toString()
        } else if (typeof value === 'boolean') {
          return value ? 'true' : 'false'
        } else {
          // 默认处理为字符串
          return `'${String(value).replace(/'/g, "''")}'`
        }
      })

      const valuesString = values.join(', ')
      const insertSql = `INSERT INTO ${datasetId} (${columnNames}) VALUES (${valuesString})`
      await this.duckDB.query(insertSql)
    }
  }
}
