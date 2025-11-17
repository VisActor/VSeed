import { DuckDB } from './db/duckDb'

export class Dataset {
  private duckDB: DuckDB
  private _datasetId: string
  private _tableName: string

  constructor(duckDB: DuckDB, datasetId: string, tableName: string) {
    this.duckDB = duckDB
    this._datasetId = datasetId
    this._tableName = tableName
  }

  public async queryBySQL(sql: string) {
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

  public async disConnect() {
    // 暂时没有需要释放的资源
  }

  get datasetId() {
    return this._datasetId
  }

  get tableName() {
    return this._tableName
  }
}
