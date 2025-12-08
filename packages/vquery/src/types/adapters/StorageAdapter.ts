import { DatasetSchema } from '../DataSet'
import { DatasetSource } from '../DataSource'

export interface StorageAdapter {
  open: () => Promise<void>
  close: () => Promise<void>
  writeDataset: (datasetId: string, datasetSchema: DatasetSchema, datasetSource?: DatasetSource) => Promise<void>
  readDataset: (datasetId: string) => Promise<{ datasetSchema: DatasetSchema; datasetSource?: DatasetSource } | null>
  deleteDataset: (datasetId: string) => Promise<void>
  listDatasets: () => Promise<{ datasetId: string; datasetSchema: DatasetSchema; datasetSource?: DatasetSource }[]>
}
