import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zFunnelTransform } from './funnelTransform/zFunnelTransform'
import { zPivotChartGridConfig } from './pivotGrid'

export const zFunnelConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  pivotGrid: zPivotChartGridConfig.nullish(),
  transform: zFunnelTransform.nullish(),
})

export type FunnelConfig = z.infer<typeof zFunnelConfig>
