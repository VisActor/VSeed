import { z } from 'zod'
import { zXBandAxis, zYBandAxis } from './bandAxis'
import { zXLinearAxis, zYLinearAxis } from './linearAxis'

export const zConfig = z.object({
  line: z
    .object({
      xAxis: zXBandAxis,
      yAxis: zYLinearAxis,
    })
    .optional(),
  column: z
    .object({
      xAxis: zXBandAxis,
      yAxis: zYLinearAxis,
    })
    .optional(),
  columnParallel: z
    .object({
      xAxis: zXBandAxis,
      yAxis: zYLinearAxis,
    })
    .optional(),
  columnPercent: z
    .object({
      xAxis: zXBandAxis,
      yAxis: zYLinearAxis,
    })
    .optional(),
  bar: z
    .object({
      xAxis: zXLinearAxis,
      yAxis: zYBandAxis,
    })
    .optional(),
  barParallel: z
    .object({
      xAxis: zXLinearAxis,
      yAxis: zYBandAxis,
    })
    .optional(),
  barPercent: z
    .object({
      xAxis: zXLinearAxis,
      yAxis: zYBandAxis,
    })
    .optional(),
  area: z
    .object({
      xAxis: zXBandAxis,
      yAxis: zYLinearAxis,
    })
    .optional(),
  areaPercent: z
    .object({
      xAxis: zXBandAxis,
      yAxis: zYLinearAxis,
    })
    .optional(),
  pie: z.object({}).optional(),
  donut: z.object({}).optional(),
  rose: z.object({}).optional(),
  dualAxis: z.object({}).optional(),
  table: z.object({}).optional(),
  pivotTable: z.object({}).optional(),
})

export type Config = z.infer<typeof zConfig>
