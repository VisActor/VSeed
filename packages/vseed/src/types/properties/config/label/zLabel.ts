import { z } from 'zod'

export const zLabel = z.object({
  enable: z.boolean().nullish(),
  wrap: z.boolean().nullish(),
  showValue: z.boolean().nullish(),
  showValuePercent: z.boolean().nullish(),
})
