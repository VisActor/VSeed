import type { SpecPipeline } from 'src/types'
import { initBar, dataset, xLinear, yBand, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const barSpecPipeline: SpecPipeline = [
  initBar,
  color,
  backgroundColor,
  dataset,
  xLinear,
  yBand,
  label,
  tooltip,
  legend,
]
