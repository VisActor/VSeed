import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor/backgroundColor'
import { zColor } from './color/color'
import { zLabel } from './label'
import { zLegend } from './legend/legend'
import { zTooltip } from './tooltip/tooltip'
import { zPivotChartGridConfig } from './pivotGrid'
import { zHeatmapCell } from './heatmap/zHeatmap'

export const zHeatmapConfig = z.object({
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  color: zColor.nullish(),
  tooltip: zTooltip.nullish(),
  legend: zLegend.nullish(),

  pivotGrid: zPivotChartGridConfig.nullish(),
  cell: zHeatmapCell.nullish(),
})

export type HeatmapConfig = z.infer<typeof zHeatmapConfig>
