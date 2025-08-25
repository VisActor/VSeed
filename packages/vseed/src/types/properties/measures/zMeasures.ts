import { z } from 'zod'
import { zNumFormat } from './format/numFormat'
import type { MeasureGroup } from './measures'

export const zMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  autoFormat: z.boolean().default(true),
  format: zNumFormat.default({}),
})

export const zMeasureGroup: z.ZodType<MeasureGroup> = z.object({
  id: z.string(),
  alias: z.string().optional(),
  get children() {
    return z.array(zMeasureGroup.or(zMeasure)).optional()
  },
})

export const zMeasures = z.array(zMeasure)
export const zMeasureTree = z.array(zMeasureGroup.or(zMeasure))
