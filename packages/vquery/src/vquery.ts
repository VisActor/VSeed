import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'
import { DatasetSchema } from './types'

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
  public async createDataset(datasetId: string, url: string, datasetSchema: DatasetSchema) {
    await this.ensureInitialized()
    await this.indexedDB.writeDataset(datasetId, url, datasetSchema)
  }

  /**
   * 修改数据集，更新信息到indexedDB内
   */
  public async updateDataset(datasetId: string, url: string, datasetSchema: DatasetSchema) {
    await this.ensureInitialized()
    await this.indexedDB.writeDataset(datasetId, url, datasetSchema)
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
    const { url, datasetSchema } = datasetInfo
    // 注册文件到DuckDB
    await this.duckDB.writeFile(datasetId, url)

    // 加载数据到DuckDB
    // DuckDB会自动识别文件格式并创建表
    const loadDataSql = `CREATE OR REPLACE TABLE ${datasetId} AS SELECT * FROM '${datasetId}'`
    await this.duckDB.query(loadDataSql)

    return new Dataset(this.duckDB, datasetId, datasetSchema.datasetAlias || datasetId)
  }
}
