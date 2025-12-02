import { z } from 'zod'

export const VBIDimensionSchema = z.object({
  alias: z.string(),
})

export const VBIDimensionGroupSchema: z.ZodType<VBIDimensionGroup> = z.object({
  alias: z.string(),
  children: z.lazy(() => z.array(z.union([VBIDimensionSchema, VBIDimensionGroupSchema]))),
})

export const VBIDimensionTreeSchema = z.array(z.union([VBIDimensionSchema, VBIDimensionGroupSchema]))

export type VBIDimension = z.infer<typeof VBIDimensionSchema>
export type VBIDimensionGroup = {
  alias: string
  children: (VBIDimension | VBIDimensionGroup)[]
}
export type VBIDimensionTree = z.infer<typeof VBIDimensionTreeSchema>
