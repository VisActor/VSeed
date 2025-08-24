import { z } from 'zod'

export const zDualChartType = z.object({
  main: z
    .enum([
      // cartesian
      'line',
      'column',
      'columnPercent',
      'columnParallel',

      'area',
      'areaPercent',
      'areaRange',
    ])
    .default('column'),
  secondary: z
    .enum([
      // cartesian
      'line',
      'column',
      'columnPercent',
      'columnParallel',

      'area',
      'areaPercent',
      'areaRange',
    ])
    .default('line'),
})

export type DualChartType = z.infer<typeof zDualChartType>
