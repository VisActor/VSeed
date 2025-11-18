import { Where, WhereClause, WhereGroup, WhereLeaf } from 'src/types'
import { SelectItem } from 'src/types/QueryDSL/Select'

export const isSelectItem = <T>(item: keyof T | SelectItem<T>): item is SelectItem<T> => {
  return typeof item === 'object' && 'field' in item
}

export const isWhereLeaf = <T>(where: Where<T> | WhereClause<T>): where is WhereLeaf<T> => {
  return 'field' in where && 'op' in where && 'value' in where
}

export const isWhereGroup = <T>(where: Where<T> | WhereClause<T>): where is WhereGroup<T> => {
  return 'op' in where && 'conditions' in where
}

export const isStringOrNumber = (value: unknown): value is string | number => {
  return typeof value === 'string' || typeof value === 'number'
}

export const escapeLiteral = <T>(value: T[keyof T]): T[keyof T] => {
  if (typeof value === 'string') {
    return `'${value.replace(/'/g, "''")}'` as unknown as T[keyof T]
  }
  return value
}
