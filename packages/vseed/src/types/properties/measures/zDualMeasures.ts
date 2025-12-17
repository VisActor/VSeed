import { z } from 'zod'
import { zMeasure } from './zMeasures'

export const zDualMeasure = zMeasure.extend({
  chartType: z.enum(['line', 'column', 'columnParallel', 'area', 'scatter']).optional(),
  encoding: z.enum(['primaryYAxis', 'secondaryYAxis', 'color', 'label', 'tooltip']).optional(),
})

export const zDualMeasures = z.array(zDualMeasure)
