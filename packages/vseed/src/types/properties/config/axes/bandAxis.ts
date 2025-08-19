import { z } from 'zod'
import type { Axis } from './axis'

export type XBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero' | 'log' | 'logBase'>
export type YBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero' | 'log' | 'logBase'>

export const zXBandAxis = z.object({
  visible: z.boolean().default(true).optional(),

  labelAutoHide: z.boolean().default(true).optional(),
  labelAutoHideGap: z.number().default(0).optional(),
  labelAutoRotate: z.boolean().default(true).optional(),
  labelAutoRotateAngleRange: z.array(z.number()).default([0, -45, -90]).optional(),
  labelAutoLimit: z.boolean().default(true).optional(),
  labelAutoLimitLength: z.number().default(100).optional(),
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
export const zYBandAxis = zXBandAxis
