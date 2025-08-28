import { z } from 'zod'

export const zCrosshairLine = z.object({
  visible: z.boolean().nullish(),
  lineColor: z.string().nullish(),
  labelColor: z.string().nullish(),
  labelVisible: z.boolean().nullish(),
  labelBackgroundColor: z.string().nullish(),
})

export type CrosshairLine = z.infer<typeof zCrosshairLine>

export const zCrosshairRect = z.object({
  visible: z.boolean().nullish(),
  rectColor: z.string().nullish(),
  labelColor: z.string().nullish(),
  labelVisible: z.boolean().nullish(),
  labelBackgroundColor: z.string().nullish(),
})

export type CrosshairRect = z.infer<typeof zCrosshairLine>
