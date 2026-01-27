import { z } from 'zod'

export const zPage = z.object({
  field: z.string(),
  currentValue: z.union([z.string(), z.number()]),
})
