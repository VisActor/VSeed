import type { SpecPipeline } from 'src/types'
import { dataset, xBand, yLinear, initColumnParallel, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const columnParallelSpecPipeline: SpecPipeline = [
  initColumnParallel,
  color,
  backgroundColor,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  legend,
]
