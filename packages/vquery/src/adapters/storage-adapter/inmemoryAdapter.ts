import { DatasetSource, StorageAdapter } from 'src/types'
import { DatasetSchema } from '../../types/DataSet'

// 为了代码清晰，定义一个内部存储记录的类型
type StoredDataset = {
  datasetId: string
  datasetSchema: DatasetSchema
  datasetSource?: DatasetSource
}

export class InMemoryAdapter implements StorageAdapter {
  private datasets: Map<string, StoredDataset> = new Map()
  private isOpen = false

  constructor() {}

  public open = async () => {
    this.isOpen = true
    if (!this.isOpen) {
      this.datasets = new Map()
    }
  }

  public close = async () => {
    this.isOpen = false
    this.datasets.clear()
  }

  public writeDataset = (
    datasetId: string,
    datasetSchema: DatasetSchema,
    datasetSource?: DatasetSource,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        const record: StoredDataset = { datasetId, datasetSchema, datasetSource }
        this.datasets.set(datasetId, record)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  public readDataset = (
    datasetId: string,
  ): Promise<{ datasetSource?: DatasetSource; datasetSchema: DatasetSchema } | null> => {
    return new Promise((resolve, reject) => {
      try {
        const record = this.datasets.get(datasetId)
        if (record) {
          resolve(record)
        } else {
          resolve(null)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  public deleteDataset = (datasetId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        this.datasets.delete(datasetId)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  public listDatasets = (): Promise<StoredDataset[]> => {
    return new Promise((resolve, reject) => {
      try {
        // Array.from(this.datasets.values()) 将 Map 中的所有值转换为数组
        resolve(Array.from(this.datasets.values()))
      } catch (error) {
        reject(error)
      }
    })
  }
}
