import z from 'zod'

export type ChartType =
  | 'table'
  | 'pivotTable'
  | 'line'
  | 'column'
  | 'columnPercent'
  | 'columnParallel'
  | 'bar'
  | 'barPercent'
  | 'barParallel'
  | 'area'
  | 'areaPercent'
  | 'rose'
  | 'pie'
  | 'donut'
  | 'dualAxis'

export enum ChartTypeEnum {
  Table = 'table',
  PivotTable = 'pivotTable',
  Line = 'line',
  Column = 'column',
  ColumnPercent = 'columnPercent',
  ColumnParallel = 'columnParallel',
  Bar = 'bar',
  BarPercent = 'barPercent',
  BarParallel = 'barParallel',
  Area = 'area',
  AreaPercent = 'areaPercent',
  Rose = 'rose',
  Pie = 'pie',
  Donut = 'donut',
  DualAxis = 'dualAxis',
}

export const zChartType = z.enum([
  'table',
  'pivotTable',
  'line',
  'column',
  'columnPercent',
  'columnParallel',
  'bar',
  'barPercent',
  'barParallel',
  'area',
  'areaPercent',
  'rose',
  'pie',
  'donut',
  'dualAxis',
])
