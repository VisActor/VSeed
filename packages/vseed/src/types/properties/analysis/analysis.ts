import { z } from 'zod'

export const zAnalysis = z.object({
  orderMapping: z.record(z.string(), z.array(z.string())).optional(),
})
