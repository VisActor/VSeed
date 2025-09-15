import { z } from 'zod'
import { zXBandAxis, zYBandAxis, zXLinearAxis, zYLinearAxis } from './axes'
import { zCrosshairLine, zCrosshairRect } from './crosshair'
import { zStackCornerRadius } from './stackCornerRadius/stackCornerRadius'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zDualChartType } from '../chartType'

/**
 * zConfig by 图表类型
 */
export const zTableConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),

  // Border
  borderColor: z.string().nullish(),

  // Body
  bodyFontSize: z.number().nullish(),
  bodyFontColor: z.string().nullish(),
  bodyBackgroundColor: z.string().nullish(),
  // Body interaction
  hoverBodyBackgroundColor: z.string().nullish(),
  hoverBodyInlineBackgroundColor: z.string().nullish(),

  // Header
  headerFontSize: z.number().nullish(),
  headerFontColor: z.string().nullish(),
  headerBackgroundColor: z.string().nullish(),
  // Header interaction
  hoverHeaderBackgroundColor: z.string().nullish(),
  hoverHeaderInlineBackgroundColor: z.string().nullish(),

  // Interaction
  selectedBorderColor: z.string().nullish(),
  selectedBackgroundColor: z.string().nullish(),
})
export const zPivotTableConfig = zTableConfig

export const zLineConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairLine: zCrosshairLine.nullish(),
})
export const zColumnConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  stackCornerRadius: zStackCornerRadius.nullish(),
})
export const zColumnParallelConfig = zColumnConfig
export const zColumnPercentConfig = zColumnConfig
export const zBarConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXLinearAxis.nullish(),
  yAxis: zYBandAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  stackCornerRadius: zStackCornerRadius.nullish(),
})
export const zBarParallelConfig = zBarConfig
export const zBarPercentConfig = zBarConfig
export const zAreaConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairLine: zCrosshairLine.nullish(),
})
export const zAreaPercentConfig = zAreaConfig

export const zDualAxisConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  dualChartType: z.array(zDualChartType).or(zDualChartType).nullish(),
  alignTicks: z.array(z.boolean()).or(z.boolean()).nullish(),
  primaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).nullish(),
  secondaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).nullish(),

  xAxis: zXBandAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
})
export const zScatterConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXLinearAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairLine: zCrosshairLine.nullish(),
})

// polar
export const zRoseConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),
})
export const zRoseParallelConfig = zRoseConfig
export const zPieConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),
})
export const zDonutConfig = zPieConfig
export const zRadarConfig = zPieConfig
// other
export const zFunnelConfig = zPieConfig
export const zHeatmapConfig = zPieConfig

/**
 * ---
 * Type config by chart type
 */
export type TableConfig = z.infer<typeof zTableConfig>
export type PivotTableConfig = z.infer<typeof zPivotTableConfig>
// cartesian
export type LineConfig = z.infer<typeof zLineConfig>
export type ColumnConfig = z.infer<typeof zColumnConfig>
export type ColumnParallelConfig = z.infer<typeof zColumnParallelConfig>
export type ColumnPercentConfig = z.infer<typeof zColumnPercentConfig>
export type BarConfig = z.infer<typeof zBarConfig>
export type BarParallelConfig = z.infer<typeof zBarParallelConfig>
export type BarPercentConfig = z.infer<typeof zBarPercentConfig>
export type AreaConfig = z.infer<typeof zAreaConfig>
export type AreaPercentConfig = z.infer<typeof zAreaPercentConfig>

export type ScatterConfig = z.infer<typeof zScatterConfig>
export type DualAxisConfig = z.infer<typeof zDualAxisConfig>
// polar
export type RoseConfig = z.infer<typeof zRoseConfig>
export type RoseParallelConfig = z.infer<typeof zRoseParallelConfig>
export type PieConfig = z.infer<typeof zPieConfig>
export type DonutConfig = z.infer<typeof zDonutConfig>
export type RadarConfig = z.infer<typeof zRadarConfig>
// other
export type FunnelConfig = z.infer<typeof zFunnelConfig>
export type HeatmapConfig = z.infer<typeof zHeatmapConfig>

/**
 * config and type
 */
export type Config = z.infer<typeof zConfig>
export const zConfig = z.object({
  table: zTableConfig.nullish(),
  pivotTable: zPivotTableConfig.nullish(),

  // cartesian
  line: zLineConfig.nullish(),
  column: zColumnConfig.nullish(),
  columnParallel: zColumnParallelConfig.nullish(),
  columnPercent: zColumnPercentConfig.nullish(),
  bar: zBarConfig.nullish(),
  barParallel: zBarParallelConfig.nullish(),
  barPercent: zBarPercentConfig.nullish(),
  area: zAreaConfig.nullish(),
  areaPercent: zAreaPercentConfig.nullish(),

  scatter: zScatterConfig.nullish(),
  dualAxis: zDualAxisConfig.nullish(),

  // polar
  rose: zRoseConfig.nullish(),
  roseParallel: zRoseParallelConfig.nullish(),
  pie: zPieConfig.nullish(),
  donut: zDonutConfig.nullish(),
  radar: zRadarConfig.nullish(),
  // other
  funnel: zFunnelConfig.nullish(),
  heatmap: zHeatmapConfig.nullish(),
})
