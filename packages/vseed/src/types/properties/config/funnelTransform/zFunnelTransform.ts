import { z } from 'zod'

export const zFunnelTransform = z.object({
  backgroundColor: z.string().nullish(),
  textColor: z.string().nullish(),
})
