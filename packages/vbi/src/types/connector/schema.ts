import { z } from 'zod'

export const zSchema = z.array(
  z.object({
    name: z.string(),
    type: z.string(),
  }),
)

export type Schema = z.infer<typeof zSchema>

export const zDiscoverSchema = z.custom<() => Promise<Schema>>()

export type DiscoverSchema = z.infer<typeof zDiscoverSchema>
