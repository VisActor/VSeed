import { z } from 'zod'

export const zMeasureEncoding = z
  .union([
    z.literal('primaryYAxis'),
    z.literal('secondaryYAxis'),
    z.literal('xAxis'),
    z.literal('yAxis'),
    z.literal('angle'),
    z.literal('radius'),
    z.literal('size'),
    z.literal('color'),
    z.literal('label'),
    z.literal('tooltip'),
  ])
  .or(
    z.array(
      z.union([
        z.literal('primaryYAxis'),
        z.literal('secondaryYAxis'),
        z.literal('xAxis'),
        z.literal('yAxis'),
        z.literal('angle'),
        z.literal('radius'),
        z.literal('size'),
        z.literal('color'),
        z.literal('label'),
        z.literal('tooltip'),
      ]),
    ),
  )
