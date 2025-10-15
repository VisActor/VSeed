import { DuckDB } from './db/duckDb'
import { IndexedDB } from './db/indexedDb'

export class VQuery {
  private duckDB: DuckDB
  private indexedDB: IndexedDB

  constructor(dbName: string = 'vquery') {
    this.duckDB = new DuckDB()
    this.indexedDB = new IndexedDB(dbName)
  }

  /**
   * @description 初始化数据库
   */
  public instantiate = async () => {
    await this.duckDB.instantiate()
    await this.indexedDB.open()
  }

  /**
   * @description 关闭数据库
   */
  public close = async () => {
    await this.duckDB.close()
    this.indexedDB.close()
  }

  /**
   * @description 注册文件
   * @param fileName 文件名
   * @param source 文件内容
   */
  public registerFile = async (fileName: string, source: string | ArrayBuffer | Uint8Array | Blob) => {
    let blob: Blob

    if (typeof source === 'string') {
      const response = await fetch(source)
      blob = await response.blob()
    } else if (source instanceof ArrayBuffer) {
      blob = new Blob([source])
    } else if (source instanceof Uint8Array) {
      blob = new Blob([source.slice()])
    } else if (source instanceof Blob) {
      blob = source
    } else {
      throw new Error('Unsupported source type')
    }

    await this.indexedDB.writeFile(fileName, blob)
    await this.duckDB.registerFile(fileName, blob)
  }

  /**
   * @description 从 IndexedDB 读取文件并注册到 DuckDB
   * @param fileName 文件名
   */
  public loadFile = async (fileName: string) => {
    const blob = await this.indexedDB.readFile(fileName)
    if (blob) {
      await this.duckDB.registerFile(fileName, blob)
    } else {
      throw new Error(`File ${fileName} not found in IndexedDB`)
    }
  }

  /**
   * @description 列出 IndexedDB 中的所有文件
   */
  public listFiles = (): Promise<string[]> => {
    return this.indexedDB.listFiles()
  }

  /**
   * @description 执行 SQL 查询
   * @param sql SQL 语句
   */
  public query = async (sql: string) => {
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
}
