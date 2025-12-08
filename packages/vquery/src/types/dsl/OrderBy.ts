export type OrderBy<T> = Array<{
  field: string | keyof T
  order?: 'asc' | 'desc'
}>
