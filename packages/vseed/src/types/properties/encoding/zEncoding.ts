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
  value: z.array(z.string()).nullish(),
})

/**
 * @description 仅VSeed内AdvancedVSeed使用此结构, 其余场景请使用DimensionEncodingEnum、MeasureEncodingEnum
 */
export const EncodingEnum = {
  x: 'x',
  y: 'y',
  angle: 'angle',
  radius: 'radius',
  detail: 'detail',

  color: 'color',
  size: 'size',
  tooltip: 'tooltip',
  label: 'label',

  row: 'row',
  column: 'column',

  group: 'group',
} as const
