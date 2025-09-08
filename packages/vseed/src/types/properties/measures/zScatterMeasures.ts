import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zScatterMeasure = z.object({
  id: z.string(),

  xMeasures: z.array(zMeasure).or(zMeasure).optional(),

  yMeasures: z.array(zMeasure).or(zMeasure).optional(),
})

export const zScatterMeasures = z.array(zScatterMeasure)
