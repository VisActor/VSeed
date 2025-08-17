import { z } from 'zod'
import { zXBandAxis, zYBandAxis } from './axes/bandAxis'
import { zXLinearAxis, zYLinearAxis } from './axes/linearAxis'
import { zCrosshairLine, zCrosshairRect } from './crosshair/crosshair'
import { zStackCornerRadius } from './stackCornerRadius/stackCornerRadius'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label/label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'

export const zTableConfig = z.object({
  // Border
  borderColor: z.string().optional(),

  // Body
  bodyFontSize: z.number().optional(),
  bodyFontColor: z.string().optional(),
  bodyBackgroundColor: z.string().optional(),

  // Header
  headerFontSize: z.number().optional(),
  headerFontColor: z.string().optional(),
  headerBackgroundColor: z.string().optional(),

  // Interaction
  hoverBackgroundColor: z.string().optional(),
  selectedBorderColor: z.string().optional(),
})
export const zPivotTableConfig = zTableConfig

export const zLineConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),

  xAxis: zXBandAxis.optional(),
  yAxis: zYLinearAxis.optional(),
  crosshairLine: zCrosshairLine.optional(),
})
export const zColumnConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),

  xAxis: zXBandAxis.optional(),
  yAxis: zYLinearAxis.optional(),
  crosshairRect: zCrosshairRect.optional(),
  stackCornerRadius: zStackCornerRadius.optional(),
})
export const zColumnParallelConfig = zColumnConfig
export const zColumnPercentConfig = zColumnConfig
export const zBarConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),

  xAxis: zXLinearAxis.optional(),
  yAxis: zYBandAxis.optional(),
  crosshairRect: zCrosshairRect.optional(),
  stackCornerRadius: zStackCornerRadius.optional(),
})
export const zBarParallelConfig = zBarConfig
export const zBarPercentConfig = zBarConfig
export const zAreaConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),

  xAxis: zXBandAxis.optional(),
  yAxis: zYLinearAxis.optional(),
  crosshairLine: zCrosshairLine.optional(),
})
export const zAreaPercentConfig = zAreaConfig
export const zRoseConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),
})
export const zRoseParallelConfig = zRoseConfig
export const zPieConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),
})
export const zDonutConfig = zPieConfig
export const zDualAxisConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),
})
export const zScatterConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),

  xAxis: zXLinearAxis.optional(),
  yAxis: zYLinearAxis.optional(),
  crosshairLine: zCrosshairLine.optional(),
})
export const zFunnelConfig = z.object({
  backgroundColor: zBackgroundColor.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  label: zLabel.optional(),
  legend: zLegend.optional(),
})
export const zConfig = z.object({
  table: zTableConfig.optional(),
  pivotTable: zPivotTableConfig.optional(),

  line: zLineConfig.optional(),
  column: zColumnConfig.optional(),
  columnParallel: zColumnParallelConfig.optional(),
  columnPercent: zColumnPercentConfig.optional(),
  bar: zBarConfig.optional(),
  barParallel: zBarParallelConfig.optional(),
  barPercent: zBarPercentConfig.optional(),
  area: zAreaConfig.optional(),
  areaPercent: zAreaPercentConfig.optional(),

  rose: zRoseConfig.optional(),
  roseParallel: zRoseParallelConfig.optional(),
  pie: zPieConfig.optional(),
  donut: zDonutConfig.optional(),
  dualAxis: zDualAxisConfig.optional(),
  scatter: zScatterConfig.optional(),
  funnel: zFunnelConfig.optional(),
})

export type TableConfig = z.infer<typeof zTableConfig>
export type PivotTableConfig = z.infer<typeof zPivotTableConfig>

export type LineConfig = z.infer<typeof zLineConfig>
export type ColumnConfig = z.infer<typeof zColumnConfig>
export type ColumnParallelConfig = z.infer<typeof zColumnParallelConfig>
export type ColumnPercentConfig = z.infer<typeof zColumnPercentConfig>
export type BarConfig = z.infer<typeof zBarConfig>
export type BarParallelConfig = z.infer<typeof zBarParallelConfig>
export type BarPercentConfig = z.infer<typeof zBarPercentConfig>
export type AreaConfig = z.infer<typeof zAreaConfig>
export type AreaPercentConfig = z.infer<typeof zAreaPercentConfig>
export type RoseConfig = z.infer<typeof zRoseConfig>
export type FunnelConfig = z.infer<typeof zFunnelConfig>
export type RoseParallelConfig = z.infer<typeof zRoseParallelConfig>
export type PieConfig = z.infer<typeof zPieConfig>
export type DonutConfig = z.infer<typeof zDonutConfig>
export type DualAxisConfig = z.infer<typeof zDualAxisConfig>
export type ScatterConfig = z.infer<typeof zScatterConfig>

export type Config = z.infer<typeof zConfig>
