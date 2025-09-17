import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zScatterMeasure = z.object({
  id: z.string(),

  xMeasures: z
    .array(
      zMeasure.omit({
        parentId: true,
        encoding: true,
      }),
    )
    .or(zMeasure)
    .optional(),

  yMeasures: z
    .array(
      zMeasure.omit({
        parentId: true,
        encoding: true,
      }),
    )
    .or(zMeasure)
    .optional(),
})

export const zScatterMeasures = z.array(zScatterMeasure)
