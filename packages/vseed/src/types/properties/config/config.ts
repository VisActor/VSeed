import { z } from 'zod'
import { zXBandAxis, zYBandAxis } from './bandAxis'
import { zXLinearAxis, zYLinearAxis } from './linearAxis'
import { zCrosshairLine, zCrosshairRect } from './crosshair'
import { zStackCornerRadius } from './stackCornerRadius'

export const zConfig = z.object({
  table: z.object({}).optional(),
  pivotTable: z.object({}).optional(),

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
      stackCornerRadius: zStackCornerRadius.optional(),
    })
    .optional(),
  columnParallel: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
      stackCornerRadius: zStackCornerRadius.optional(),
    })
    .optional(),
  columnPercent: z
    .object({
      xAxis: zXBandAxis.optional(),
      yAxis: zYLinearAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
      stackCornerRadius: zStackCornerRadius.optional(),
    })
    .optional(),
  bar: z
    .object({
      xAxis: zXLinearAxis.optional(),
      yAxis: zYBandAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
      stackCornerRadius: zStackCornerRadius.optional(),
    })
    .optional(),
  barParallel: z
    .object({
      xAxis: zXLinearAxis.optional(),
      yAxis: zYBandAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
      stackCornerRadius: zStackCornerRadius.optional(),
    })
    .optional(),
  barPercent: z
    .object({
      xAxis: zXLinearAxis.optional(),
      yAxis: zYBandAxis.optional(),
      crosshairRect: zCrosshairRect.optional(),
      stackCornerRadius: zStackCornerRadius.optional(),
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

  rose: z.object({}).optional(),
  roseParallel: z.object({}).optional(),
  pie: z.object({}).optional(),
  donut: z.object({}).optional(),
  dualAxis: z.object({}).optional(),
  scatter: z.object({}).optional(),
  funnel: z.object({}).optional(),
})

export type Config = z.infer<typeof zConfig>
