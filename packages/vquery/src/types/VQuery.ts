export type Field = string
export type Aggregation = 'sum' | 'avg' | 'count' | 'min' | 'max'
export type Granularity = 'year' | 'month' | 'day'
export type Operator = '=' | '!=' | '>' | '<' | '>=' | '<='
export type Direction = 'asc' | 'desc'

export type Measure = {
  field: Field
  aggregation: Aggregation
}
export type Dimension = {
  field: Field
  granularity: Granularity
}
export type Filter = {
  field: Field
  operator: Operator
  value: string | number | boolean
}
export type PeriodCompare = {
  type: 'year_over_year' | 'month_over_month'
  field: Field
}
export type Order = {
  field: Field
  direction: Direction
}

export interface Query {
  measures: Array<Measure>
  dimensions: Array<Dimension>
  filters: Array<Filter>
  periodCompare: Array<PeriodCompare>
  order: Array<Order>
}
