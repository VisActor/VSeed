import type { SpecPipeline } from 'src/types'
import { dataset, xLinear, yBand, initBarParallel, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const barParallelSpecPipeline: SpecPipeline = [
  initBarParallel,
  color,
  backgroundColor,
  dataset,
  xLinear,
  yBand,
  label,
  tooltip,
  legend,
]
