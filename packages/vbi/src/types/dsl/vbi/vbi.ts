import { z } from 'zod'
import type { ChartType } from '@visactor/vseed'
import { VBIDimensionTreeSchema } from '../dimensions/dimensions'
import { VBIMeasureTreeSchema } from '../measures/measures'
import { VBIDSLThemeSchema } from '../theme/theme'
import { VBIDSLLocaleSchema } from '../locale/locale'

export const VBISchema = z.object({
  connectorId: z.string(),
  chartType: z.custom<ChartType>(),
  dimensions: VBIDimensionTreeSchema,
  measures: VBIMeasureTreeSchema,
  theme: VBIDSLThemeSchema,
  locale: VBIDSLLocaleSchema,
})

export type VBI = z.infer<typeof VBISchema>
