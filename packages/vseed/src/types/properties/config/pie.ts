import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zPieLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zPivotChartGridConfig } from './pivotGrid'
import { zBrushConfig } from '../brush/zBrush'

export const zPieConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zPieLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),
  pivotGrid: zPivotChartGridConfig.nullish(),
  cornerRadius: z.number().nullish(),
  brush: zBrushConfig.nullish(),
})
export const zDonutConfig = zPieConfig
export const zRadarConfig = zPieConfig

export type PieConfig = z.infer<typeof zPieConfig>
export type DonutConfig = z.infer<typeof zDonutConfig>
export type RadarConfig = z.infer<typeof zRadarConfig>
