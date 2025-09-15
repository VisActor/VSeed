import { z } from 'zod'

export const zDimensionEncoding = z.enum([
  'xAxis',
  'yAxis',
  'angle',
  'color',
  'detail',
  'tooltip',
  'label',
  'row',
  'column',
])

export const DimensionEncodingEnum = {
  xAxis: 'xAxis',
  yAxis: 'yAxis',
  angle: 'angle',
  color: 'color',
  detail: 'detail',
  tooltip: 'tooltip',
  label: 'label',
  row: 'row',
  column: 'column',
} as const
