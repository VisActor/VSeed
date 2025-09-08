import { z } from 'zod'

export const zEncoding = z.object({
  x: z.array(z.string()).nullish(),
  y: z.array(z.string()).nullish(),
  angle: z.array(z.string()).nullish(),
  radius: z.array(z.string()).nullish(),
  detail: z.array(z.string()).nullish(),

  color: z.array(z.string()).nullish(),
  size: z.array(z.string()).nullish(),
  tooltip: z.array(z.string()).nullish(),
  label: z.array(z.string()).nullish(),

  row: z.array(z.string()).nullish(),
  column: z.array(z.string()).nullish(),

  group: z.array(z.string()).nullish().describe('已弃用, 请使用颜色替代'),
})

export const zEncodings = z.array(zEncoding)
