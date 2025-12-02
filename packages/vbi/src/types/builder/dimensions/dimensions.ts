import { z } from 'zod'

export const zDimensionsBuilder = z.object({
  add: z.custom<(dimension: string) => void>(),
})

export type DimensionsBuilder = z.infer<typeof zDimensionsBuilder>
