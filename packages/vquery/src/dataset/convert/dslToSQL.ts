import { QueryDSL } from 'src/types'
import { isSelectItem } from './utils'
import { applyWhere } from './applyWhere'

export const convertDSLToSQL = <T>(dsl: QueryDSL<T>, tableName: string): string => {
  let sql = 'SELECT'

  // select
  if (dsl.select && dsl.select.length > 0) {
    const selectFields = dsl.select.map((item) => {
      if (typeof item === 'string') {
        return item
      }
      if (isSelectItem(item)) {
        if (item.func) {
          return `${item.func}(${item.field as string})` + (item.alias ? ` AS "${item.alias}"` : '')
        }
        if (item.alias) {
          return `${item.field as string} AS "${item.alias}"`
        }
        return item.field as string
      }
    })
    sql += ` ${selectFields.join(', ')}`
  } else {
    sql += ' *'
  }

  sql += ` FROM ${tableName}`

  // where
  if (dsl.where) {
    const whereClause = applyWhere(dsl.where)
    if (whereClause) {
      sql += ` WHERE ${whereClause}`
    }
  }

  // groupBy
  if (dsl.groupBy && dsl.groupBy.length > 0) {
    sql += ` GROUP BY ${dsl.groupBy.join(', ')}`
  }

  // orderBy
  if (dsl.orderBy && dsl.orderBy.length > 0) {
    const orderByFields = dsl.orderBy.map((item) => {
      return `${item.field as string}${item.order ? ` ${item.order.toUpperCase()}` : ''}`
    })
    sql += ` ORDER BY ${orderByFields.join(', ')}`
  }

  // limit
  if (dsl.limit) {
    sql += ` LIMIT ${dsl.limit}`
  }

  return sql
}
