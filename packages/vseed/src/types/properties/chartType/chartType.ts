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
