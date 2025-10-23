import { z } from 'zod'
import { zXBandAxis, zYLinearAxis } from './axes'
import { zCrosshairRect } from './crosshair'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zDualChartType } from '../chartType'
import { zAnnotationConfig } from './annotation/zAnnotaion'
import { zPivotChartGridConfig } from './pivotGrid'

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
  pivotGrid: zPivotChartGridConfig.nullish(),
  annotation: zAnnotationConfig.nullish(),
})

export type DualAxisConfig = z.infer<typeof zDualAxisConfig>
