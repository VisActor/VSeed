/* eslint-disable @typescript-eslint/no-explicit-any */

import { QueryResult } from '../QueryResult'

export interface QueryAdapter {
  open: () => Promise<void>

  close: () => Promise<void>

  writeFile: <T extends Blob>(fileName: string, source: T) => Promise<void>

  getSchema: (fileName: string) => Promise<QueryResult>

  query: (sql: string) => Promise<{
    dataset: any[]
    table: any
  }>
}
