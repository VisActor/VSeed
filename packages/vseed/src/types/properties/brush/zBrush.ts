import { z } from 'zod'

const zBrushStyleConfig = z.object({
  opacity: z.number().optional(),
  stroke: z.string().optional(),
  lineWidth: z.number().optional(),
})

export const zBrushConfig = z.object({
  enable: z.boolean().optional().default(false),
  inBrushStyle: zBrushStyleConfig.optional(),
  outOfBrushStyle: zBrushStyleConfig.optional(),
})

export type BrushConfig = z.infer<typeof zBrushConfig>

export const zBrush = z.object({
  enable: z.boolean().optional().default(false),
  brushType: z.enum(['x', 'y', 'rect', 'polygon']).optional().default('rect'),
  brushMode: z.enum(['single', 'multiple']).optional().default('single'),
  removeOnClick: z.boolean().optional().default(true),
  inBrushStyle: zBrushStyleConfig.optional(),
  outOfBrushStyle: zBrushStyleConfig.optional(),
})
