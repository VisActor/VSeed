import { z } from 'zod'
import type { ChartType } from '@visactor/vseed'

export const ChartTypeBuilderSchema = z.object({
  setChartType: z.custom<(chartType: ChartType) => void>(),
})

export type ChartTypeBuilder = z.infer<typeof ChartTypeBuilderSchema>
