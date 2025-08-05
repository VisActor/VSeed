import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initArea, stack, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const areaSpecPipeline: SpecPipeline = [
  initArea,
  color,
  backgroundColor,
  stack,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  legend,
]
