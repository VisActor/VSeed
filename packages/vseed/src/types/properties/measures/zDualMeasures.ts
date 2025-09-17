import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zDualMeasure = z.object({
  id: z.string(),

  primaryMeasures: z
    .array(
      zMeasure.omit({
        encoding: true,
        parentId: true,
      }),
    )
    .or(
      zMeasure.omit({
        parentId: true,
        encoding: true,
      }),
    )
    .optional(),

  secondaryMeasures: z.array(zMeasure).or(zMeasure).optional(),
})

export const zDualMeasures = z.array(zDualMeasure)
