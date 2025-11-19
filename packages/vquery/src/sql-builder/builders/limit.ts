import type { SelectQueryBuilder } from 'kysely'

export const applyLimit = <DB, TB extends keyof DB & string, O>(qb: SelectQueryBuilder<DB, TB, O>, limit?: number) => {
  if (limit && typeof limit === 'number') {
    qb = qb.limit(limit)
  }
  return qb
}
