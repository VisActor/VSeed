import { z } from 'zod'

export const SchemaSchema = z.array(
  z.object({
    name: z.string(),
    type: z.string(),
  }),
)

export type Schema = z.infer<typeof SchemaSchema>

export const DiscoverSchemaSchema = z.custom<() => Promise<Schema>>()

export type DiscoverSchema = z.infer<typeof DiscoverSchemaSchema>
