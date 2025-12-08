import { InMemoryAdapter } from './adapters'
import { DuckDBNodeQueryAdapter } from './adapters/query-adapter/duckdbNodeAdapter'
import { Dataset } from './dataset/dataset'
import { RawDatasetSource, DatasetColumn, QueryAdapter, StorageAdapter } from './types'
import { DatasetSourceBuilder } from 'src/data-source-builder'

export class VQuery {
  private queryAdapter: QueryAdapter
  private storageAdapter: StorageAdapter
  private isInitialized: boolean = false

  constructor() {
    this.queryAdapter = new DuckDBNodeQueryAdapter()
    this.storageAdapter = new InMemoryAdapter()
  }

  private async checkInitialized() {
    if (!this.isInitialized) {
      await this.queryAdapter.open()
      await this.storageAdapter.open()
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
    await this.storageAdapter.writeDataset(datasetId, datasetSchema, datasetSource)
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
    await this.storageAdapter.writeDataset(datasetId, datasetSchema, datasetSource)
  }

  public async dropDataset(datasetId: string) {
    await this.checkInitialized()
    await this.checkDatasetExists(datasetId)

    await this.storageAdapter.deleteDataset(datasetId)
  }

  public async connectDataset(
    datasetId: string,
    temporaryColumns?: DatasetColumn[],
    temporaryRawDatasetSource?: RawDatasetSource,
  ): Promise<Dataset> {
    await this.checkInitialized()
    await this.checkDatasetExists(datasetId)

    const dataset = new Dataset(this.queryAdapter, this.storageAdapter, datasetId)
    const temporaryDatasetSource = temporaryRawDatasetSource
      ? await DatasetSourceBuilder.from(temporaryRawDatasetSource).build()
      : undefined

    await dataset.init(temporaryColumns, temporaryDatasetSource)
    return dataset
  }

  public async hasDataset(datasetId: string) {
    await this.checkInitialized()

    const datasets = await this.storageAdapter.listDatasets()
    return datasets.some((item) => item.datasetId === datasetId)
  }

  public async listDatasets() {
    await this.checkInitialized()

    return this.storageAdapter.listDatasets()
  }

  public async close() {
    await this.checkInitialized()
    await this.queryAdapter.close()
    await this.storageAdapter.close()
  }
}
