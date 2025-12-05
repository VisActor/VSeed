import { z } from 'zod'

const zSimpleAggregate = z.object({
  func: z.literal(['sum', 'count', 'avg', 'min', 'max']),
})

const zQuantileAggregate = z.object({
  func: z.literal(['quantile']),
  quantile: z.number().min(0).max(1),
})

export const zAggregate = z.discriminatedUnion('func', [zSimpleAggregate, zQuantileAggregate])
