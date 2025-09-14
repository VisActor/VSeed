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
