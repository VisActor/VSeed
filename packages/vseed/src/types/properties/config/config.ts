import { z } from 'zod'
import { zXBandAxis, zYBandAxis } from './bandAxis'
import { zXLinearAxis, zYLinearAxis } from './linearAxis'
import { zCrosshairLine, zCrosshairRect } from './crosshair'

export const zConfig = z.object({
  line: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairLine: zCrosshairLine.optional(),
    })
    .optional(),
  column: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
    })
    .optional(),
  columnParallel: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
    })
    .optional(),
  columnPercent: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
    })
    .optional(),
  bar: z
    .object({
      xAxis: zXLinearAxis.optional(),
      yAxis: zYBandAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
    })
    .optional(),
  barParallel: z
    .object({
      xAxis: zXLinearAxis.optional(),
      yAxis: zYBandAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
    })
    .optional(),
  barPercent: z
    .object({
      xAxis: zXLinearAxis.optional(),
      yAxis: zYBandAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
    })
    .optional(),
  area: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairLine: zCrosshairLine.optional(),
    })
    .optional(),
  areaPercent: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairLine: zCrosshairLine.optional(),
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
