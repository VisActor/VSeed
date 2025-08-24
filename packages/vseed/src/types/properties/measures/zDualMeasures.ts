import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zDualMeasure = z.object({
  id: z.string(),

  primaryMeasures: z.array(zMeasure).or(zMeasure).optional(),
  primaryAlias: z.string().optional(),

  secondaryMeasures: z.array(zMeasure).or(zMeasure).optional(),
  secondaryAlias: z.string().optional(),
})

export const zDualMeasures = z.array(zDualMeasure)
