import { z } from 'zod'

export const DimensionsBuilderSchema = z.object({
  add: z.custom<(dimension: string) => void>(),
})

export type DimensionsBuilder = z.infer<typeof DimensionsBuilderSchema>
