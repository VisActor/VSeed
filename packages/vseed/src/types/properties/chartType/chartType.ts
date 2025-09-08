import { z } from 'zod'

export type ChartType =
  | 'table'
  | 'pivotTable'
  // cartesian
  | 'line'
  | 'column'
  | 'columnPercent'
  | 'columnParallel'
  | 'bar'
  | 'barPercent'
  | 'barParallel'
  | 'area'
  | 'areaPercent'
  | 'scatter'
  | 'dualAxis'
  // polar
  | 'rose'
  | 'roseParallel'
  | 'pie'
  | 'donut'
  | 'radar'
  // other
  | 'heatmap'
  | 'funnel'

export enum ChartTypeEnum {
  Table = 'table',
  PivotTable = 'pivotTable',
  // cartesian
  Line = 'line',
  Column = 'column',
  ColumnPercent = 'columnPercent',
  ColumnParallel = 'columnParallel',
  Bar = 'bar',
  BarPercent = 'barPercent',
  BarParallel = 'barParallel',
  Area = 'area',
  AreaPercent = 'areaPercent',
  DualAxis = 'dualAxis',
  Scatter = 'scatter',
  // polar
  Rose = 'rose',
  RoseParallel = 'roseParallel',
  Pie = 'pie',
  Donut = 'donut',
  Radar = 'radar',
  // other
  Funnel = 'funnel',
  Heatmap = 'heatmap',
}

export const zChartType = z.enum([
  'table',
  'pivotTable',
  // cartesian
  'line',
  'column',
  'columnPercent',
  'columnParallel',
  'bar',
  'barPercent',
  'barParallel',
  'area',
  'areaPercent',
  'scatter',
  'dualAxis',
  // polar
  'rose',
  'roseParallel',
  'pie',
  'donut',
  'radar',
  // other
  'funnel',
  'heatmap',
])
