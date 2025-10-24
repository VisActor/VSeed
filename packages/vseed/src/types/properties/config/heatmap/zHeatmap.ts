import { z } from 'zod'

export const zHeatmapCell = z.object({
  stroke: z.string().nullish(),
  lineWidth: z.number().nullish(),
  cornerRadius: z.number().nullish(),
})
