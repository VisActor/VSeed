import { QueryDSL, Where, WhereClause } from 'src/types'
import { isSelectItem, isWhereGroup } from './utils'
import { Kysely } from 'kysely'
import { sql } from 'kysely'
import type { RawBuilder } from 'kysely'
import { LiteSqliteDialect } from './kyselyDialect'

const escapeValue = (value: unknown): string => {
  if (value === null) return 'null'
  if (typeof value === 'string') return `'${value.replace(/'/g, "''")}'`
  if (typeof value === 'number') return `${value}`
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  return `'${String(value).replace(/'/g, "''")}'`
}

type TableDB<TableName extends string, Row> = {
  [K in TableName]: Row
}

export const convertDSLToSQL = <T, TableName extends string>(dsl: QueryDSL<T>, tableName: TableName): string => {
  const db = new Kysely<TableDB<TableName, T>>({ dialect: new LiteSqliteDialect() })

  let qb = db.selectFrom(tableName)

  if (dsl.select && dsl.select.length > 0) {
    qb = qb.select((eb) =>
      dsl.select.map((item) => {
        if (typeof item === 'string') {
          return item as Extract<keyof T, string>
        }
        if (isSelectItem(item)) {
          const field = item.field as Extract<keyof T, string>
          if (item.func) {
            const alias = item.alias ?? (field as string)
            switch (item.func) {
              case 'avg':
                return eb.fn.avg(field).as(alias)
              case 'sum':
                return eb.fn.sum(field).as(alias)
              case 'min':
                return eb.fn.min(field).as(alias)
              case 'max':
                return eb.fn.max(field).as(alias)
              case 'count':
                return eb.fn.count(field).as(alias)
            }
          }
          return item.alias ? eb.ref(field).as(item.alias) : field
        }
        return item as unknown as Extract<keyof T, string>
      }),
    )
  } else {
    qb = qb.selectAll()
  }

  if (dsl.where) {
    const toRawWhere = (where: Where<T> | WhereClause<T>): RawBuilder<boolean> => {
      if (isWhereGroup(where)) {
        const parts: RawBuilder<boolean>[] = where.conditions.map((c) => toRawWhere(c as WhereClause<T>))
        const sep: RawBuilder<unknown> = sql` ${sql.raw(where.op)} `
        return sql<boolean>`(${sql.join(parts, sep)})`
      }
      const leaf = where as unknown as { field: Extract<keyof T, string>; op: string; value?: unknown }
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
    qb = qb.where(toRawWhere(dsl.where as Where<T>))
  }

  if (dsl.groupBy && dsl.groupBy.length > 0) {
    qb = qb.groupBy(dsl.groupBy as Array<Extract<keyof T, string>>)
  }

  if (dsl.orderBy && dsl.orderBy.length > 0) {
    for (const o of dsl.orderBy) {
      qb = qb.orderBy(o.field as Extract<keyof T, string>, (o.order ?? 'asc') as 'asc' | 'desc')
    }
  }

  if (dsl.limit) {
    qb = qb.limit(dsl.limit)
  }

  const compiled = qb.compile()
  let out = compiled.sql
  for (const p of compiled.parameters) {
    out = out.replace(/\?/, escapeValue(p))
  }
  return out
}
