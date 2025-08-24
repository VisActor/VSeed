import { z } from 'zod'

export const zDualChartType = z.object({
  primary: z
    .enum(['line', 'column', 'columnPercent', 'columnParallel', 'area', 'areaPercent', 'scatter'])
    .default('column'),
  secondary: z
    .enum(['line', 'column', 'columnPercent', 'columnParallel', 'area', 'areaPercent', 'scatter'])
    .default('line'),
})

export type DualChartType = z.infer<typeof zDualChartType>
