import { z } from 'zod'
import type { DimensionGroup } from './dimensions'

export const zDimension = z.object({
  id: z.string(),
  alias: z.string().optional(),
  location: z.enum(['rowDimension', 'columnDimension']).optional(),
  encoding: z.enum(['xAxis', 'yAxis', 'angle', 'color', 'detail', 'tooltip', 'label', 'row', 'column']).optional(),
})
export const zDimensionGroup: z.ZodType<DimensionGroup> = z.object({
  id: z.string(),
  alias: z.string().optional(),
  get children() {
    return z.array(zDimensionGroup.or(zDimension)).optional()
  },
})
export const zDimensions = z.array(zDimension)
export const zDimensionTree = z.array(zDimensionGroup.or(zDimension))
