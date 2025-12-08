import { DatasetSource, StorageAdapter } from 'src/types'
import { DatasetSchema } from '../../types/DataSet'

export class IndexedDBAdapter implements StorageAdapter {
  private db: IDBDatabase | null = null
  private dbName: string
  private datasetStoreName = 'vqueryDatasets'

  constructor(dbName: string) {
    this.dbName = dbName
  }

  public open = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 2)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        // 创建数据集存储
        if (!db.objectStoreNames.contains(this.datasetStoreName)) {
          db.createObjectStore(this.datasetStoreName, { keyPath: 'datasetId' })
        }
      }

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  public close = async (): Promise<void> => {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  public writeDataset = (
    datasetId: string,
    datasetSchema: DatasetSchema,
    datasetSource?: DatasetSource,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.datasetStoreName], 'readwrite')
      const store = transaction.objectStore(this.datasetStoreName)
      const request = store.put({ datasetId, datasetSchema, datasetSource })

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public readDataset = (
    datasetId: string,
  ): Promise<{ datasetSource?: DatasetSource; datasetSchema: DatasetSchema } | null> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.datasetStoreName], 'readonly')
      const store = transaction.objectStore(this.datasetStoreName)
      const request = store.get(datasetId)

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result as
          | { dataSource?: DatasetSource; datasetSchema: DatasetSchema }
          | undefined
        resolve(result || null)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public deleteDataset = (datasetId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.datasetStoreName], 'readwrite')
      const store = transaction.objectStore(this.datasetStoreName)
      const request = store.delete(datasetId)

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public listDatasets = (): Promise<
    { datasetId: string; dataSource?: DatasetSource; datasetSchema: DatasetSchema }[]
  > => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.datasetStoreName], 'readonly')
      const store = transaction.objectStore(this.datasetStoreName)
      const request = store.getAll()

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result as {
          datasetId: string
          dataSource?: DatasetSource
          datasetSchema: DatasetSchema
        }[]
        resolve(result)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }
}
