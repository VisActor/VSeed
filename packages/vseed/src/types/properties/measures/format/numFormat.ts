import { z } from 'zod'

export const zNumFormat = z
  .object({
    type: z.enum(['number', 'percent', 'permille']).default('number').optional(),
    ratio: z.number().default(1).optional(),
    symbol: z.string().default('').optional(),
    thousandSeparator: z.boolean().default(false).optional(),
    decimalPlaces: z.number().default(2).optional(),
    round: z.enum(['round', 'floor', 'ceil']).default('round').optional(),
    prefix: z.string().default('').optional(),
    suffix: z.string().default('').optional(),
  })
  .optional()

export type NumFormat = z.infer<typeof zNumFormat>
