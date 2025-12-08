import { GroupBy } from './GroupBy'
import { OrderBy } from './OrderBy'
import { Select } from './Select'
import { Where } from './Where'

export interface QueryDSL<Table> {
  select: Select<Table>
  where?: Where<Table>
  groupBy?: GroupBy<Table>
  orderBy?: OrderBy<Table>
  limit?: number
}

export type VQueryDSL<Table = Record<string, unknown>> = QueryDSL<Table>
