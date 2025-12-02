import { z } from 'zod'

export const FieldsBuilderSchema = z.object({
  setFields: z.custom<(fields: string[]) => void>(),
})

export type FieldsBuilder = z.infer<typeof FieldsBuilderSchema>
