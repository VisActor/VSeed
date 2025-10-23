/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DuckDBBundles, AsyncDuckDBConnection } from '@duckdb/duckdb-wasm'
import { AsyncDuckDB, selectBundle, ConsoleLogger } from '@duckdb/duckdb-wasm'
import { QueryResult } from 'src/types'

export class DuckDB {
  private db: AsyncDuckDB | null = null
  private connection: AsyncDuckDBConnection | null = null

  constructor() {}

  /**
   * @description 初始化 DuckDB 实例
   */
  init = async () => {
    const MANUAL_BUNDLES: DuckDBBundles = {
      mvp: {
        mainModule: new URL('@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm', import.meta.url).href,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
      },
      eh: {
        mainModule: new URL('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm', import.meta.url).href,
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
      },
    }

    const bundle = await selectBundle(MANUAL_BUNDLES)
    const worker_url = URL.createObjectURL(
      new Blob([`importScripts("${bundle.mainWorker!}");`], { type: 'text/javascript' }),
    )
    const worker = new Worker(worker_url)
    const logger = new ConsoleLogger()

    this.db = new AsyncDuckDB(logger, worker)
    await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker)
    URL.revokeObjectURL(worker_url)

    this.connection = await this.db.connect()
  }

  /**
   * @description 释放 DuckDB 实例
   */
  close = async () => {
    if (this.connection) {
      await this.connection.close()
      this.connection = null
    }
    if (this.db) {
      await this.db.terminate()
      this.db = null
    }
  }

  /**
   * 注册文件到 DuckDB 实例
   * @param fileName 文件名
   * @param source 文件内容
   */
  writeFile = async <T extends string | ArrayBuffer | Uint8Array | Blob>(fileName: string, source: T) => {
    if (!this.db) {
      throw new Error('db is null')
    }
    let uint8Array: Uint8Array

    if (typeof source === 'string') {
      // fetch url
      const response = await fetch(source)
      const buffer = await response.arrayBuffer()
      uint8Array = new Uint8Array(buffer)
    } else if (source instanceof Blob) {
      // blob object
      const buffer = await source.arrayBuffer()
      uint8Array = new Uint8Array(buffer)
    } else if (source instanceof ArrayBuffer) {
      // array buffer
      uint8Array = new Uint8Array(source)
    } else if (source instanceof Uint8Array) {
      uint8Array = source
    } else {
      throw new Error('Unsupported source type')
    }

    await this.db.registerFileBuffer(fileName, uint8Array)
  }

  /**
   * @description 执行 SQL 查询
   * @param sql SQL 语句
   * @returns 查询结果
   */
  query = async (sql: string): Promise<{ dataset: any[]; table: any }> => {
    if (!this.connection) {
      throw new Error('connection is null')
    }
    const table = await this.connection.query(sql)
    const dataset = table.toArray().map((row) => row.toJSON())
    return {
      dataset,
      table,
    }
  }

  /**
   * 确保一个文件存在，如果不存在，则根据同名文件创建临时表
   * @param fileName 文件名
   */
  private ensureSchema = async (fileName: string) => {
    if (!this.connection) {
      throw new Error('connection is null')
    }
    await this.connection.query(
      `CREATE TEMP TABLE IF NOT EXISTS "${fileName}" AS SELECT * FROM read_csv_auto('${fileName}')`,
    )
  }

  /**
   * @description 获取文件的 Schema
   * @param fileName 文件名
   * @returns 文件的 Schema
   */
  getSchema = async (fileName: string): Promise<QueryResult> => {
    if (!this.connection) {
      throw new Error('connection is null')
    }

    await this.ensureSchema(fileName)

    const result = await this.connection.query(`PRAGMA table_info('${fileName}')`)
    return result.toArray().map((row) => row.toJSON())
  }
}
