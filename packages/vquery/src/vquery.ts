import { Dataset } from './dataset/dataset'
import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'
import { RawDatasetSource, DatasetColumn } from './types'
import { DatasetSourceBuilder } from 'src/data-source-builder'

export class VQuery {
  private duckDB: DuckDB
  private indexedDB: IndexedDB
  private isInitialized: boolean = false

  constructor(dbName: string = 'vquery') {
    this.duckDB = new DuckDB()
    this.indexedDB = new IndexedDB(dbName)
  }

  private async checkInitialized() {
    if (!this.isInitialized) {
      await this.duckDB.init()
      await this.indexedDB.open()
      this.isInitialized = true
    }
  }

  private async checkDatasetExists(datasetId: string) {
    if (!(await this.hasDataset(datasetId))) {
      throw new Error(`dataset ${datasetId} not exists, please create it first`)
    }
  }

  public async createDataset(datasetId: string, columns: DatasetColumn[] = [], rawDatasetSource?: RawDatasetSource) {
    await this.checkInitialized()

    const datasetSource = rawDatasetSource ? await DatasetSourceBuilder.from(rawDatasetSource).build() : undefined
    if (await this.hasDataset(datasetId)) {
      throw new Error(`dataset ${datasetId} already exists`)
    }
    const datasetSchema = {
      datasetId,
      datasetAlias: datasetId,
      columns: columns,
    }
    await this.indexedDB.writeDataset(datasetId, datasetSchema, datasetSource)
  }

  public async updateDatasetSource(
    datasetId: string,
    columns: DatasetColumn[] = [],
    rawDatasetSource?: RawDatasetSource,
  ) {
    await this.checkInitialized()
    await this.checkDatasetExists(datasetId)

    const datasetSource = rawDatasetSource ? await DatasetSourceBuilder.from(rawDatasetSource).build() : undefined
    const datasetSchema = {
      datasetId,
      datasetAlias: datasetId,
      columns: columns,
    }
    await this.indexedDB.writeDataset(datasetId, datasetSchema, datasetSource)
  }

  public async dropDataset(datasetId: string) {
    await this.checkInitialized()
    await this.checkDatasetExists(datasetId)

    await this.indexedDB.deleteDataset(datasetId)
  }

  public async connectDataset(datasetId: string, temporaryColumns: DatasetColumn[] = []) {
    await this.checkInitialized()
    await this.checkDatasetExists(datasetId)

    const dataset = new Dataset(this.duckDB, this.indexedDB, datasetId)
    await dataset.init(temporaryColumns)
    return dataset
  }

  public async hasDataset(datasetId: string) {
    await this.checkInitialized()

    const datasets = await this.indexedDB.listDatasets()
    return datasets.some((item) => item.datasetId === datasetId)
  }

  public async listDatasets() {
    await this.checkInitialized()

    return this.indexedDB.listDatasets()
  }

  public async close() {
    await this.checkInitialized()
    await this.duckDB.close()
  }
}
