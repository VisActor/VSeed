/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import type { DuckDBBundles } from '@duckdb/duckdb-wasm/dist/duckdb-node-blocking'
import {
  createDuckDB,
  ConsoleLogger,
  NODE_RUNTIME,
  DuckDBConnection,
  // @ts-ignore
} from '@duckdb/duckdb-wasm/dist/duckdb-node-blocking'
import { createRequire } from 'node:module'
import { QueryAdapter } from 'src/types'
import { QueryResult } from 'src/types/DataSet'

export class DuckDBNodeQueryAdapter implements QueryAdapter {
  private bindings: any | null = null
  private connection: DuckDBConnection | null = null

  constructor() {}

  open = async () => {
    const require = createRequire(import.meta.url)
    const MANUAL_BUNDLES: DuckDBBundles = {
      mvp: {
        mainModule: require.resolve('@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm'),
        mainWorker: '',
      },
      eh: {
        mainModule: require.resolve('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm'),
        mainWorker: '',
      },
    }

    const logger = new ConsoleLogger()
    this.bindings = await createDuckDB(MANUAL_BUNDLES, logger, NODE_RUNTIME)
    await this.bindings.instantiate(() => {})
    this.bindings.open({})
    this.connection = this.bindings.connect()
  }

  close = async () => {
    if (this.connection) {
      this.connection.close()
      this.connection = null
    }
    if (this.bindings) {
      this.bindings.reset()
      this.bindings = null
    }
  }

  writeFile = async <T extends Blob>(fileName: string, source: T) => {
    if (!this.bindings) {
      throw new Error('bindings is null')
    }
    let uint8Array: Uint8Array

    if (source instanceof Blob) {
      // blob object
      const buffer = await source.arrayBuffer()
      uint8Array = new Uint8Array(buffer)
    } else {
      throw new Error('Unsupported source type')
    }

    await this.bindings.registerFileBuffer(fileName, uint8Array)
  }

  query = async (sql: string) => {
    if (!this.connection) {
      throw new Error('connection is null')
    }
    const table = await this.connection.query(sql)
    const dataset = table.toArray().map((row: any) => row.toJSON())
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
    return result.toArray().map((row: any) => row.toJSON()) as QueryResult
  }
}
