import { z } from 'zod'

export const zMeasureEncoding = z.enum([
  'primaryYAxis',
  'secondaryYAxis',
  'xAxis',
  'yAxis',
  'angle',
  'radius',
  'size',
  'color',
  'detail',
  'column',
  'label',
  'tooltip',
])

export const MeasureEncodingEnum = {
  primaryYAxis: 'primaryYAxis',
  secondaryYAxis: 'secondaryYAxis',
  xAxis: 'xAxis',
  yAxis: 'yAxis',
  angle: 'angle',
  radius: 'radius',
  size: 'size',
  color: 'color',
  detail: 'detail',
  column: 'column',
  label: 'label',
  tooltip: 'tooltip',
} as const
