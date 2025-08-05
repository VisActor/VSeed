import { z } from 'zod'
import { zBackgroundColor } from './backgroundColor'
import { zLabel } from './label'
import { zColor } from './color'
import { zTooltip } from './tooltip'
import { zLegend } from './legend'

const zVChartBaseConfig = z.object({
  backgroundColor: zBackgroundColor,
  label: zLabel.optional(),
  color: zColor.optional(),
  tooltip: zTooltip.optional(),
  legend: zLegend.optional(),
})

const zVTableBaseConfig = z.object({
  backgroundColor: zBackgroundColor,
})

export const zBaseConfig = z.object({
  vchart: zVChartBaseConfig.optional(),
  vtable: zVTableBaseConfig.optional(),
})

export type VTableBaseConfig = z.infer<typeof zVTableBaseConfig>
export type VChartBaseConfig = z.infer<typeof zVChartBaseConfig>
