import { Where, WhereClause } from 'src/types'
import { sql } from 'kysely'
import type { RawBuilder } from 'kysely'

export const applyWhere = <T>(where: Where<T> | WhereClause<T>): RawBuilder<boolean> => {
  const toRaw = (w: Where<T> | WhereClause<T>): RawBuilder<boolean> => {
    if ('op' in w && 'conditions' in w) {
      const parts: RawBuilder<boolean>[] = (w.conditions as Array<WhereClause<T>>).map((c) => toRaw(c))
      const sep: RawBuilder<unknown> = sql` ${sql.raw(w.op)} `
      return sql<boolean>`(${sql.join(parts, sep)})`
    }
    const leaf = w as unknown as { field: Extract<keyof T, string>; op: string; value?: unknown }
    const field = leaf.field
    const value = leaf.value
    switch (leaf.op) {
      case 'is null':
        return sql<boolean>`${sql.ref(field)} is null`
      case 'is not null':
        return sql<boolean>`${sql.ref(field)} is not null`
      case 'in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`${sql.ref(field)} in (${sql.join(items.map((v) => sql.val(v)))})`
      }
      case 'not in': {
        const items = Array.isArray(value) ? (value as unknown[]) : [value]
        return sql<boolean>`not ${sql.ref(field)} in (${sql.join(items.map((v) => sql.val(v)))})`
      }
      case 'between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`${sql.ref(field)} between (${sql.val(a)}, ${sql.val(b)})`
      }
      case 'not between': {
        const [a, b] = value as [unknown, unknown]
        return sql<boolean>`not ${sql.ref(field)} between (${sql.val(a)}, ${sql.val(b)})`
      }
      default:
        return sql<boolean>`${sql.ref(field)} ${sql.raw(leaf.op)} ${sql.val(value)}`
    }
  }
  return toRaw(where)
}
