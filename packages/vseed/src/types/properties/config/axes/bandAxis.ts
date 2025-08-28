import { z } from 'zod'
import type { Axis } from './axis'

export type XBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero' | 'log' | 'logBase'>
export type YBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero' | 'log' | 'logBase'>

export const zXBandAxis = z.object({
  visible: z.boolean().default(true).nullish(),

  labelAutoHide: z.boolean().default(true).nullish(),
  labelAutoHideGap: z.number().default(0).nullish(),
  labelAutoRotate: z.boolean().default(true).nullish(),
  labelAutoRotateAngleRange: z.array(z.number()).default([0, -45, -90]).nullish(),
  labelAutoLimit: z.boolean().default(true).nullish(),
  labelAutoLimitLength: z.number().default(100).nullish(),
  label: z
    .object({
      visible: z.boolean().default(true).nullish(),
      labelColor: z.string().default('#797B85').nullish(),
      labelFontSize: z.number().default(12).nullish(),
      labelFontWeight: z.number().default(400).nullish(),
      labelAngle: z.number().default(0).nullish(),
    })
    .nullish(),
  line: z
    .object({
      visible: z.boolean().default(true).nullish(),
      lineColor: z.string().default('rgba(54, 65, 89, 0.30)').nullish(),
      lineWidth: z.number().default(1).nullish(),
    })
    .nullish(),
  tick: z
    .object({
      visible: z.boolean().default(true).nullish(),
      tickInside: z.boolean().default(false).nullish(),
      tickColor: z.string().default('rgba(54, 65, 89, 0.30)').nullish(),
      tickSize: z.number().default(4).nullish(),
    })
    .nullish(),
  title: z
    .object({
      visible: z.boolean().default(false).nullish(),
      titleText: z.string().default('').nullish(),
      titleColor: z.string().default('#646A73').nullish(),
      titleFontSize: z.number().default(12).nullish(),
      titleFontWeight: z.number().default(400).nullish(),
    })
    .nullish(),
  grid: z
    .object({
      visible: z.boolean().default(false).nullish(),
      gridColor: z.string().default('rgba(54, 65, 89, 0.15)').nullish(),
      gridWidth: z.number().default(0.5).nullish(),
    })
    .nullish(),
})
export const zYBandAxis = zXBandAxis
