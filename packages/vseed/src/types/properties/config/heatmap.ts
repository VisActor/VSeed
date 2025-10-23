import type { z } from 'zod'
import { zAreaConfig } from './area'

export const zHeatmapConfig = zAreaConfig
export type HeatmapConfig = z.infer<typeof zHeatmapConfig>
