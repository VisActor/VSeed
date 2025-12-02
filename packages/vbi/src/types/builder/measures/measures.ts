import { z } from 'zod'

export const zMeasuresBuilder = z.object({
  add: z.custom<(measure: string) => void>(),
})

export type MeasuresBuilder = z.infer<typeof zMeasuresBuilder>
