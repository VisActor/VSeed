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
