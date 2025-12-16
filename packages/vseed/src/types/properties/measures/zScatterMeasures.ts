import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zScatterMeasure = zMeasure.extend({
  encoding: z.enum(['xAxis', 'yAxis', 'size', 'color', 'label', 'tooltip']).optional(),
})

export const zScatterMeasures = z.array(zScatterMeasure)
