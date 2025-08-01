import { z } from 'zod'

export const zEncoding = z.array(
  z.object({
    x: z.array(z.string()).optional(),
    y: z.array(z.string()).optional(),
    color: z.array(z.string()).optional(),
    group: z.array(z.string()).optional(),
    angle: z.array(z.string()).optional(),
    radius: z.array(z.string()).optional(),
    tooltip: z.array(z.string()).optional(),
  }),
)

export type Encoding = Array<{
  x?: string[]
  y?: string[]
  color?: string[]
  group?: string[]
  angle?: string[]
  radius?: string[]
  tooltip?: string[]
}>
