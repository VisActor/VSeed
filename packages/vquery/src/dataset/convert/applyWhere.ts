import { Where, WhereClause, WhereLeaf } from 'src/types'
import { isStringOrNumber, isWhereGroup, isWhereLeaf } from './utils'

export const applyWhere = <T>(where: Where<T> | WhereClause<T>): string => {
  const escape = <T>(str: T[keyof T]): T[keyof T] => {
    if (typeof str === 'string') {
      return `'${str.replace(/'/g, "''")}'` as T[keyof T]
    }
    return str
  }

  if (isWhereGroup(where)) {
    const logicalOp = where.op.toUpperCase()
    return `(${where.conditions.map((c) => applyWhere(c)).join(` ${logicalOp} `)})`
  }
  if (isWhereLeaf(where)) {
    const { field, op, value } = where as WhereLeaf<T>
    if (op === 'is null' || op === 'is not null') {
      return `${field as string} ${op}`
    }
    if (op === 'in' || op === 'not in') {
      if (Array.isArray(value)) {
        return `${field as string} ${op} (${value.map((v) => escape<T>(v)).join(', ')})`
      }
    }
    if (op === 'between' || op === 'not between') {
      if (Array.isArray(value) && value.length === 2 && isStringOrNumber(value[0]) && isStringOrNumber(value[1])) {
        const value0 = value[0] as T[keyof T]
        const value1 = value[1] as T[keyof T]
        return `${field as string} ${op} ${escape(value0)} and ${escape(value1)}`
      }
    }
    if (isStringOrNumber(value)) {
      const value0 = value as T[keyof T]
      return `${field as string} ${op} ${escape(value0)}`
    }
  }
  return ''
}
