export type TidyDatum = Record<string, number | string | null | boolean | undefined>

export type DataSourceType = 'csv' | 'json' | 'xlsx' | 'parquet'

export type DataSourceValue = string | ArrayBuffer | Blob | TidyDatum[]

export interface DataSource {
  type: DataSourceType
  blob: Blob
}
