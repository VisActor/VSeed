import { z } from 'zod'
import { zXLinearAxis, zYLinearAxis } from './axes'
import { zCrosshairLine } from './crosshair'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zAnnotationConfig } from './annotation/zAnnotaion'
import { zPivotChartGridConfig } from './pivotGrid'
import { zRegressionLine } from '../regressionLine/zRegressionLine'
import { zDimensionLinkage } from './dimensionLinkage/dimensionLinkage'

export const zScatterConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXLinearAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairLine: zCrosshairLine.nullish(),
  size: z.number().or(z.array(z.number())).nullish(),
  sizeRange: z.number().or(z.array(z.number())).nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),
  regressionLine: zRegressionLine.nullish(),

  dimensionLinkage: zDimensionLinkage.nullish(),
})

export type ScatterConfig = z.infer<typeof zScatterConfig>
