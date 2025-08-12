import { z } from 'zod'

export const zCrosshairLine = z.object({
  visible: z.boolean().optional(),
  lineColor: z.string().optional(),
  labelColor: z.string().optional(),
  labelVisible: z.boolean().optional(),
  labelBackgroundColor: z.string().optional(),
})

export type CrosshairLine = z.infer<typeof zCrosshairLine>

export const zCrosshairRect = z.object({
  visible: z.boolean().optional(),
  rectColor: z.string().optional(),
  labelColor: z.string().optional(),
  labelVisible: z.boolean().optional(),
  labelBackgroundColor: z.string().optional(),
})

export type CrosshairRect = z.infer<typeof zCrosshairLine>
