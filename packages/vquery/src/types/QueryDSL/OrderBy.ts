export type OrderBy<T> = Array<{
  field: keyof T
  order?: 'asc' | 'desc'
}>
