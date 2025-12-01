import { z } from 'zod'
import { zXBandAxis, zYLinearAxis } from './axes'
import { zCrosshairRect } from './crosshair'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zAnnotationConfig } from './annotation/zAnnotaion'
import { zPivotChartGridConfig } from './pivotGrid'
import { zWhiskersConfig } from './whiskers'
import { zDimensionLinkage } from './dimensionLinkage/dimensionLinkage'
import { zBoxPlotStyle, zOutlierStyle } from '../markStyle'
import { zBoxGapInGroup, zBoxMaxWidth } from './barWidth'

export const zBoxplotConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),

  whiskers: zWhiskersConfig.nullish(),

  dimensionLinkage: zDimensionLinkage.nullish(),
  boxMaxWidth: zBoxMaxWidth.nullish(),
  boxGapInGroup: zBoxGapInGroup.nullish(),

  boxPlotStyle: zBoxPlotStyle.omit({ selector: true }).nullish(),
  outlierStyle: zOutlierStyle.omit({ selector: true }).nullish(),
})

export type BoxplotConfig = z.infer<typeof zBoxplotConfig>
