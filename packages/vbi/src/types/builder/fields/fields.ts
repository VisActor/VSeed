import { z } from 'zod'

export const zFieldsBuilder = z.object({
  setFields: z.custom<(fields: string[]) => void>(),
})

export type FieldsBuilder = z.infer<typeof zFieldsBuilder>
