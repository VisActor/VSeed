export type { QueryResult } from './QueryResult'
export type DataType = 'number' | 'string' | 'date' | 'datetime' | 'timestamp'

export interface DatasetColumn {
  type: DataType
  name: string
}

export interface DatasetSchema {
  datasetId: string
  datasetAlias: string
  columns: DatasetColumn[]
}

export type TidyDatum = Record<string, number | string | null | boolean | undefined>

export type DataSourceType = 'array' | 'csv' | 'json' | 'xlsx' | 'parquet'

export interface DataSource {
  type: DataSourceType
  value: string | ArrayBuffer | Uint8Array | Blob | TidyDatum[]
}
