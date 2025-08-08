import { z } from 'zod'
import { zAxis } from './axis'

export const zConfig = z.object({
  line: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  column: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  columnParallel: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  columnPercent: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  bar: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  barParallel: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  barPercent: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  area: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
  areaPercent: z.object({
    xAxis: zAxis,
    yAxis: zAxis,
  }),
})

export type Config = z.infer<typeof zConfig>
