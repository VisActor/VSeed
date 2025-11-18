import { DatasetColumn, DataSourceType, DataType } from 'src/types'
import { DuckDB } from '../db/duckDb'
import { IndexedDB } from '../db/indexedDb'

export class Dataset {
  private duckDB: DuckDB
  private indexedDB: IndexedDB
  private _datasetId: string

  constructor(duckDB: DuckDB, indexedDB: IndexedDB, datasetId: string) {
    this.duckDB = duckDB
    this.indexedDB = indexedDB
    this._datasetId = datasetId
  }

  public async init(temporaryStructs?: DatasetColumn[]) {
    const readFunctionMap: Record<DataSourceType, string> = {
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
    const columns = temporaryStructs || datasetSchema.columns

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

  public async query(queryDSL: object) {
    const convertToSQL = (dsl: object) => {
      // 简单的DSL转换为SQL，实际应用中需要更复杂的逻辑
      return JSON.stringify(dsl).replace(/"/g, '')
    }
    return this.queryBySQL(convertToSQL(queryDSL))
  }

  public async disconnect() {
    await this.duckDB.query(`DROP VIEW IF EXISTS "${this._datasetId}"`)
  }

  get datasetId() {
    return this._datasetId
  }
}
