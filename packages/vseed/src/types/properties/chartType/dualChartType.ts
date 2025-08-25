import { z } from 'zod'

// 'columnPercent' 和 'areaPercent' 会改变轴值域为[0,1], VTable不支持.
export const zDualChartType = z.object({
  primary: z.enum(['line', 'column', 'columnParallel', 'area', 'scatter']).default('column'),
  secondary: z.enum(['line', 'column', 'columnParallel', 'area', 'scatter']).default('line'),
})

export type DualChartType = z.infer<typeof zDualChartType>
