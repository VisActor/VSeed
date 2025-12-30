import { z } from 'zod'

export const zBrushConfig = z.object({
  enable: z.boolean().optional().default(false),
  inBrushStyle: z
    .object({
      opacity: z.number().optional(),
      stroke: z.string().optional(),
      lineWidth: z.number().optional(),
    })
    .optional(),
  outOfBrushStyle: z
    .object({
      opacity: z.number().optional(),
      stroke: z.string().optional(),
      lineWidth: z.number().optional(),
    })
    .optional(),
})

export type BrushConfig = z.infer<typeof zBrushConfig>

export const zBrush = z.object({
  enable: z.boolean().optional().default(false),
  removeOnClick: z.boolean().optional().default(true),
})
