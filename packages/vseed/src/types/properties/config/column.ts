import { z } from 'zod'
import { zXBandAxis, zYLinearAxis } from './axes'
import { zCrosshairRect } from './crosshair'
import { zStackCornerRadius } from './stackCornerRadius/stackCornerRadius'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zAnnotationConfig } from './annotation/zAnnotaion'
import { zPivotChartGridConfig } from './pivotGrid'

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
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),
})
export const zColumnParallelConfig = zColumnConfig
export const zColumnPercentConfig = zColumnConfig

export type ColumnConfig = z.infer<typeof zColumnConfig>
export type ColumnParallelConfig = z.infer<typeof zColumnParallelConfig>
export type ColumnPercentConfig = z.infer<typeof zColumnPercentConfig>
