/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DuckDBBundles, AsyncDuckDBConnection } from '@duckdb/duckdb-wasm'
import { AsyncDuckDB, selectBundle, ConsoleLogger } from '@duckdb/duckdb-wasm'
import { QueryAdapter } from 'src/types'
import { QueryResult } from 'src/types/DataSet'

export class DuckDBNodeQueryAdapter implements QueryAdapter {
  private db: AsyncDuckDB | null = null
  private connection: AsyncDuckDBConnection | null = null

  constructor() {}

  open = async () => {
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

  writeFile = async <T extends Blob>(fileName: string, source: T) => {
    if (!this.db) {
      throw new Error('db is null')
    }
    let uint8Array: Uint8Array

    if (source instanceof Blob) {
      // blob object
      const buffer = await source.arrayBuffer()
      uint8Array = new Uint8Array(buffer)
    } else {
      throw new Error('Unsupported source type')
    }

    await this.db.registerFileBuffer(fileName, uint8Array)
  }

  query = async (sql: string) => {
    if (!this.connection) {
      throw new Error('connection is null')
    }
    const table = await this.connection.query(sql)
    const dataset = table.toArray().map((row) => row.toJSON())
    return {
      dataset,
      table,
    } as { dataset: any[]; table: any }
  }

  getSchema = async (fileName: string) => {
    if (!this.connection) {
      throw new Error('connection is null')
    }

    const result = await this.connection.query(`PRAGMA table_info('${fileName}')`)
    return result.toArray().map((row) => row.toJSON()) as QueryResult
  }
}
