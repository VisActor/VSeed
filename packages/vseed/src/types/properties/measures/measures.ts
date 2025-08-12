import { z } from 'zod'
import { zNumFormat } from './format/numFormat'

export const zMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  visible: z.boolean().default(true).optional(),
  autoFormat: z.boolean().default(true).optional(),
  format: zNumFormat.optional(),
})

export const zMeasureGroup = z.object({
  id: z.string(),
  alias: z.string().optional(),
  visible: z.boolean().default(true).optional(),
  get children() {
    return z.array(zMeasureGroup.or(zMeasure)).optional()
  },
})

export const zMeasures = z.array(zMeasureGroup.or(zMeasure)).optional()

export type Measures = z.infer<typeof zMeasures>
export type Measure = z.infer<typeof zMeasure>
export type MeasureGroup = z.infer<typeof zMeasureGroup>
