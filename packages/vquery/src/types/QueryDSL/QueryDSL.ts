import { GroupBy } from './GroupBy'
import { OrderBy } from './OrderBy'
import { Select } from './Select'
import { Where } from './Where'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface QueryDSL<Table extends Record<string, any>> {
  select: Select<Table>
  where?: Where<Table>
  groupBy?: GroupBy<Table>
  orderBy?: OrderBy<Table>
  limit?: number
}
