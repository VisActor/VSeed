import { z } from 'zod'

export const zEncoding = z.array(
  z.object({
    x: z.array(z.string()).nullish(),
    y: z.array(z.string()).nullish(),
    color: z.array(z.string()).nullish(),
    group: z.array(z.string()).nullish(),
    angle: z.array(z.string()).nullish(),
    radius: z.array(z.string()).nullish(),
    tooltip: z.array(z.string()).nullish(),
    size: z.array(z.string()).nullish(),
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
  size?: string[]
}>
