export type AggregateFunction = 'count' | 'sum' | 'avg' | 'min' | 'max'
export type SelectItem<T> = {
  field: keyof T
  alias?: string
  function?: AggregateFunction
}

export type Select<T> = SelectItem<T>[]
