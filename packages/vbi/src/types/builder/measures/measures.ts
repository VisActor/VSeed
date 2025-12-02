import { z } from 'zod'

export const MeasuresBuilderSchema = z.object({
  add: z.custom<(measure: string) => void>(),
})

export type MeasuresBuilder = z.infer<typeof MeasuresBuilderSchema>
