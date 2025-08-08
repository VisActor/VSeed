import { z } from 'zod'
import { type Axis } from './axis'

export type XLinearAxis = Omit<
  Axis,
  | 'labelAutoHide'
  | 'labelAutoHideGap'
  | 'labelAutoRotate'
  | 'labelAutoRotateAngleRange'
  | 'labelAutoLimit'
  | 'labelAutoLimitLength'
>
export type YLinearAxis = Omit<
  Axis,
  | 'labelAutoHide'
  | 'labelAutoHideGap'
  | 'labelAutoRotate'
  | 'labelAutoRotateAngleRange'
  | 'labelAutoLimit'
  | 'labelAutoLimitLength'
>

export const zXLinearAxis = z.object({
  visible: z.boolean().default(true).optional(),

  min: z.number().optional(),
  max: z.number().optional(),
  nice: z.boolean().default(true).optional(),
  zero: z.boolean().default(true).optional(),

  label: z
    .object({
      visible: z.boolean().default(true).optional(),
      labelColor: z.string().default('#797B85').optional(),
      labelFontSize: z.number().default(12).optional(),
      labelFontWeight: z.number().default(400).optional(),
      labelAngle: z.number().default(0).optional(),
    })
    .optional(),
  line: z
    .object({
      visible: z.boolean().default(true).optional(),
      lineColor: z.string().default('rgba(54, 65, 89, 0.30)').optional(),
      lineWidth: z.number().default(1).optional(),
    })
    .optional(),
  tick: z
    .object({
      visible: z.boolean().default(true).optional(),
      tickInside: z.boolean().default(false).optional(),
      tickColor: z.string().default('rgba(54, 65, 89, 0.30)').optional(),
      tickSize: z.number().default(4).optional(),
    })
    .optional(),
  title: z
    .object({
      visible: z.boolean().default(false).optional(),
      titleText: z.string().default('').optional(),
      titleColor: z.string().default('#646A73').optional(),
      titleFontSize: z.number().default(12).optional(),
      titleFontWeight: z.number().default(400).optional(),
    })
    .optional(),
  grid: z
    .object({
      visible: z.boolean().default(false).optional(),
      gridColor: z.string().default('rgba(54, 65, 89, 0.15)').optional(),
      gridWidth: z.number().default(0.5).optional(),
    })
    .optional(),
})

export const zYLinearAxis = zXLinearAxis
