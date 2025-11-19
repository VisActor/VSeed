import { DatasetColumn, DatasetSourceType, DataType, QueryDSL } from 'src/types'
import { DuckDB } from 'src/db/duckDb'
import { IndexedDB } from 'src/db/indexedDb'
import { convertDSLToSQL } from 'src/sql-builder'

export class Dataset {
  private duckDB: DuckDB
  private indexedDB: IndexedDB
  private _datasetId: string

  constructor(duckDB: DuckDB, indexedDB: IndexedDB, datasetId: string) {
    this.duckDB = duckDB
    this.indexedDB = indexedDB
    this._datasetId = datasetId
  }

  public async init(temporaryColumns: DatasetColumn[] = []) {
    const readFunctionMap: Record<DatasetSourceType, string> = {
      csv: 'read_csv_auto',
      json: 'read_json_auto',
      xlsx: 'read_excel',
      parquet: 'read_parquet',
    }

    const dataTypeMap: Record<DataType, string> = {
      number: 'DOUBLE',
      string: 'VARCHAR',
      date: 'DATE',
      datetime: 'TIMESTAMP',
      timestamp: 'TIMESTAMP',
    }

    const datasetInfo = await this.indexedDB.readDataset(this._datasetId)
    if (!datasetInfo) {
      throw new Error(`Dataset ${this._datasetId} not found`)
    }

    const { dataSource } = datasetInfo
    const datasetSchema = datasetInfo.datasetSchema
    const columns = temporaryColumns.length > 0 ? temporaryColumns : datasetSchema.columns

    const readFunction = readFunctionMap[dataSource.type]
    if (!readFunction) {
      throw new Error(`Unsupported dataSource type: ${dataSource.type}`)
    }

    // 注册文件到DuckDB - 只处理文件类型，不处理数组
    await this.duckDB.writeFile(this._datasetId, dataSource.blob)

    const columnsStruct = `{${columns.map((c) => `'${c.name}': '${dataTypeMap[c.type] || 'VARCHAR'}'`).join(', ')}}`
    const columnNames = columns.map((c) => `"${c.name}"`).join(', ')

    // 创建视图
    const createViewSql = `CREATE OR REPLACE VIEW "${this._datasetId}" AS SELECT ${columnNames} FROM ${readFunction}('${this._datasetId}', columns=${columnsStruct})`
    await this.duckDB.query(createViewSql)
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

  public convertDSLToSQL<T extends Record<string, number | string>>(queryDSL: QueryDSL<T>) {
    return convertDSLToSQL(queryDSL, this.datasetId)
  }

  public async query<T extends Record<string, number | string>>(queryDSL: QueryDSL<T>) {
    const sql = this.convertDSLToSQL(queryDSL)
    return this.queryBySQL(sql)
  }

  public async disconnect() {
    await this.duckDB.query(`DROP VIEW IF EXISTS "${this._datasetId}"`)
  }

  get datasetId() {
    return this._datasetId
  }
}
