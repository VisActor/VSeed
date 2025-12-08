import { DatasetColumn, DatasetSource, DatasetSourceType, DataType, QueryDSL } from 'src/types'
import { QueryAdapter, StorageAdapter } from 'src/types'
import { convertDSLToSQL } from 'src/sql-builder'

export class Dataset {
  private queryAdapter: QueryAdapter
  private storageAdapter: StorageAdapter
  private _datasetId: string

  constructor(duckDB: QueryAdapter, indexedDB: StorageAdapter, datasetId: string) {
    this.queryAdapter = duckDB
    this.storageAdapter = indexedDB
    this._datasetId = datasetId
  }

  public async init(temporaryColumns?: DatasetColumn[], temporaryDatasetSource?: DatasetSource) {
    const datasetInfo = await this.storageAdapter.readDataset(this._datasetId)
    if (!datasetInfo) {
      throw new Error(`Dataset ${this._datasetId} not found`)
    }

    const columns = temporaryColumns ? temporaryColumns : datasetInfo.datasetSchema.columns
    const datasetSource = temporaryDatasetSource || datasetInfo.datasetSource
    if (columns.length > 0 && datasetSource) {
      await this.createOrReplaceView(columns, datasetSource)
    }
  }

  public async createOrReplaceView(columns: DatasetColumn[], datasetSource: DatasetSource) {
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

    if (datasetSource) {
      const readFunction = readFunctionMap[datasetSource.type]
      if (!readFunction) {
        throw new Error(`Unsupported dataSource type: ${datasetSource.type}`)
      }

      // 注册文件到DuckDB - 只处理文件类型，不处理数组
      await this.queryAdapter.writeFile(this._datasetId, datasetSource.blob)

      const columnsStruct = `{${columns.map((c) => `'${c.name}': '${dataTypeMap[c.type] || 'VARCHAR'}'`).join(', ')}}`
      const columnNames = columns.map((c) => `"${c.name}"`).join(', ')

      // 创建视图
      const createViewSql = `CREATE OR REPLACE VIEW "${this._datasetId}" AS SELECT ${columnNames} FROM ${readFunction}('${this._datasetId}', columns=${columnsStruct})`
      await this.queryAdapter.query(createViewSql)
    }
  }

  public async query<T extends Record<string, number | string>>(queryDSL: QueryDSL<T>) {
    const sql = convertDSLToSQL(queryDSL, this.datasetId)
    return this.queryBySQL(sql)
  }

  public async queryBySQL(sql: string) {
    const start = performance?.now?.()?.toFixed(3) ?? Date.now().toFixed(3)
    const result = await this.queryAdapter.query(sql)
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

  public async disconnect() {
    await this.queryAdapter.query(`DROP VIEW IF EXISTS "${this._datasetId}"`)
  }

  get datasetId() {
    return this._datasetId
  }
}
