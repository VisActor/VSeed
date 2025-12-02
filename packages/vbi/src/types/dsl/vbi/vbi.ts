import { z } from 'zod'
import type { ChartType } from '@visactor/vseed'
import { zVBIDimensionTree } from '../dimensions/dimensions'
import { zVBIMeasureTree } from '../measures/measures'
import { zVBIDSLTheme } from '../theme/theme'
import { zVBIDSLLocale } from '../locale/locale'

export const zVBI = z.object({
  connectorId: z.string(),
  chartType: z.custom<ChartType>(),
  dimensions: zVBIDimensionTree,
  measures: zVBIMeasureTree,
  theme: zVBIDSLTheme,
  locale: zVBIDSLLocale,
})

export type VBI = z.infer<typeof zVBI>
