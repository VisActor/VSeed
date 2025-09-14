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
