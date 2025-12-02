import { z } from 'zod'

export const VBIMeasureSchema = z.object({
  alias: z.string(),
})
export type VBIMeasure = z.infer<typeof VBIMeasureSchema>

export type VBIMeasureGroup = {
  alias: string
  children: (VBIMeasure | VBIMeasureGroup)[]
}

export const VBIMeasureGroupSchema: z.ZodType<VBIMeasureGroup> = z.object({
  alias: z.string(),
  children: z.lazy(() => z.array(z.union([VBIMeasureSchema, VBIMeasureGroupSchema]))),
})

export const VBIMeasureTreeSchema = z.array(z.union([VBIMeasureSchema, VBIMeasureGroupSchema]))

export type VBIMeasureTree = z.infer<typeof VBIMeasureTreeSchema>
