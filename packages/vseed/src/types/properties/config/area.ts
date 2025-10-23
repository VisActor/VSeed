import { z } from 'zod'
import { zXBandAxis, zYLinearAxis } from './axes'
import { zCrosshairLine } from './crosshair'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zAnnotationConfig } from './annotation/zAnnotaion'
import { zPivotChartGridConfig } from './pivotGrid'

export const zAreaConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairLine: zCrosshairLine.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),
})
export const zAreaPercentConfig = zAreaConfig

export type AreaConfig = z.infer<typeof zAreaConfig>
export type AreaPercentConfig = z.infer<typeof zAreaPercentConfig>
