import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initLine, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const lineSpecPipeline: SpecPipeline = [
  initLine,
  color,
  backgroundColor,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  legend,
]
