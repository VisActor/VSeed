export class IndexedDB {
  private db: IDBDatabase | null = null
  private dbName: string
  private storeName = 'files'

  constructor(dbName: string) {
    this.dbName = dbName
  }

  public open = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'name' })
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

  public close = () => {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  public writeFile = (fileName: string, data: Blob): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      const request = store.put({ name: fileName, data })

      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public readFile = (fileName: string): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.get(fileName)

      request.onsuccess = (event) => {
        const result = (event.target as IDBRequest).result
        if (result) {
          resolve(result.data)
        } else {
          resolve(null)
        }
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }

  public listFiles = (): Promise<string[]> => {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject('DB is not open')
      }
      const transaction = this.db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      const request = store.getAllKeys()

      request.onsuccess = (event) => {
        const keys = (event.target as IDBRequest).result as string[]
        resolve(keys)
      }

      request.onerror = (event) => {
        reject((event.target as IDBRequest).error)
      }
    })
  }
}
