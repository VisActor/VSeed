import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zDualMeasure = z.object({
  primaryMeasures: z.array(zMeasure).or(zMeasure),
  secondaryMeasures: z.array(zMeasure).or(zMeasure),
})

export const zDualMeasures = z.array(zDualMeasure)
