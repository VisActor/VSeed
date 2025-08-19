import { z } from 'zod'

export type Dimension = {
  id: string
  alias?: string
  location?: 'dimension' | 'rowDimension' | 'columnDimension'
}

export type DimensionGroup = {
  id: string
  alias?: string
  children?: (Dimension | DimensionGroup)[]
}

export type Dimensions = Dimension[]

export type DimensionTree = (Dimension | DimensionGroup)[]

export const zDimension = z.object({
  id: z.string(),
  alias: z.string().optional(),
  location: z.enum(['dimension', 'rowDimension', 'columnDimension']).default('dimension'),
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
