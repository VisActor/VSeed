import z from 'zod'

export const zMeasure = z.object({
  id: z.string(),
  alias: z.string().optional(),
  visible: z.boolean().default(true).optional(),
  autoFormat: z.boolean().default(true).optional(),
  format: z
    .object({
      type: z
        .enum(['number', 'percent', 'permille'])
        .optional()
        .default('number'),
      ratio: z.number().optional().default(1),
      symbol: z.string().optional().default(''),
      thousandSeparator: z.boolean().optional().default(false),
      decimalPlaces: z.number().optional().default(2),
      round: z.enum(['round', 'floor', 'ceil']).optional().default('round'),
      prefix: z.string().optional().default(''),
      suffix: z.string().optional().default(''),
    })
    .optional(),
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
