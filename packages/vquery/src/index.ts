/* eslint-disable @typescript-eslint/no-explicit-any */
import * as duckdb from '@duckdb/duckdb-wasm'
export const squared = (n: number): number => n * n
console.info(duckdb)

export class VQuery {
  private db: duckdb.AsyncDuckDB | null = null
  private connection: duckdb.AsyncDuckDBConnection | null = null
  constructor() {
    this.db = null
  }

  instantiate = async () => {
    const JSDELIVR_BUNDLES = duckdb.getJsDelivrBundles()
    const bundle = await duckdb.selectBundle(JSDELIVR_BUNDLES)
    const worker_url = URL.createObjectURL(
      new Blob([`importScripts("${bundle.mainWorker!}");`], { type: 'text/javascript' }),
    )
    const worker = new Worker(worker_url)
    const logger = new duckdb.ConsoleLogger()

    this.db = new duckdb.AsyncDuckDB(logger, worker)
    await this.db.instantiate(bundle.mainModule, bundle.pthreadWorker)
    URL.revokeObjectURL(worker_url)

    this.connection = await this.db.connect()
  }

  registerFile = async (fileName: string, url: string) => {
    if (!this.db) {
      throw new Error('db is null')
    }
    const response = await fetch(url)
    const csvBuffer = await response.arrayBuffer()
    await this.db.registerFileBuffer(fileName, new Uint8Array(csvBuffer))
  }

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
}
