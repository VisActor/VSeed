import { z } from 'zod'
import { zNumFormat } from '../format/numFormat'
import type { MeasureGroup } from './measures'

export const zMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  autoFormat: z.boolean().default(true),
  numFormat: zNumFormat.default({}),
  format: zNumFormat.default({}),
  encoding: z
    .enum([
      'primaryYAxis',
      'secondaryYAxis',
      'xAxis',
      'yAxis',
      'angle',
      'radius',
      'size',
      'color',
      'label',
      'tooltip',
      'detail',
      'column',
    ])
    .optional(),
  parentId: z.string().optional(),
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
