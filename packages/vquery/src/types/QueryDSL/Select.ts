export type AggregateFunction = 'count' | 'sum' | 'avg' | 'min' | 'max'
export type SelectItem<T> = {
  field: keyof T
  alias?: string
  func?: AggregateFunction
}

export type Select<T> = Array<keyof T | SelectItem<T>>
