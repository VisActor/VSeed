import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zPieLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zPivotChartGridConfig } from './pivotGrid'

export const zRoseConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zPieLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
})
export const zRoseParallelConfig = zRoseConfig

export type RoseConfig = z.infer<typeof zRoseConfig>
export type RoseParallelConfig = z.infer<typeof zRoseParallelConfig>
