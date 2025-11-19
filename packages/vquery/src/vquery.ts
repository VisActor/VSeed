import { Dataset } from './dataset/dataset'
import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'
import { DatasetSchema, TidyDatum, DatasetSourceType, DatasetColumn } from './types'
import { DataSourceBuilder } from 'src/data-source-builder'

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
    type: DatasetSourceType,
    columns: DatasetColumn[] = [],
  ) {
    await this.ensureInitialized()
    const dataSource = await DataSourceBuilder.from(type, data).build()

    if (await this.hasDataset(datasetId)) {
      throw new Error(`dataset ${datasetId} already exists`)
    }

    const datasetSchema = {
      datasetId,
      datasetAlias: datasetId,
      columns: columns,
    }
    await this.indexedDB.writeDataset(datasetId, dataSource, datasetSchema)
  }

  /**
   * 修改数据集，更新信息到indexedDB内
   */
  public async updateDataset(
    datasetId: string,
    data: string | ArrayBuffer | Blob | TidyDatum[],
    type: DatasetSourceType,
    datasetSchema: DatasetSchema,
  ) {
    await this.ensureInitialized()
    if (!(await this.hasDataset(datasetId))) {
      throw new Error(`dataset ${datasetId} not exists, please create it first`)
    }

    const dataSource = await DataSourceBuilder.from(type, data).build()
    await this.indexedDB.writeDataset(datasetId, dataSource, datasetSchema)
  }

  /**
   * 删除数据集，从indexdb移除数据集
   */
  public async dropDataset(datasetId: string) {
    await this.ensureInitialized()
    if (!(await this.hasDataset(datasetId))) {
      throw new Error(`dataset ${datasetId} not exists, please create it first`)
    }

    await this.indexedDB.deleteDataset(datasetId)
  }

  /**
   * 检查数据集是否存在
   */
  public async hasDataset(datasetId: string) {
    await this.ensureInitialized()
    const datasets = await this.indexedDB.listDatasets()
    return datasets.some((item) => item.datasetId === datasetId)
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
  public async connectDataset(datasetId: string, temporaryColumns: DatasetColumn[] = []) {
    await this.ensureInitialized()

    if (!(await this.hasDataset(datasetId))) {
      throw new Error(`dataset ${datasetId} not exists, please create it first`)
    }

    const dataset = new Dataset(this.duckDB, this.indexedDB, datasetId)
    await dataset.init(temporaryColumns)
    return dataset
  }

  /**
   * 关闭所有数据集连接，释放DuckDB资源
   */
  public async close() {
    await this.ensureInitialized()
    await this.duckDB.close()
  }
}
