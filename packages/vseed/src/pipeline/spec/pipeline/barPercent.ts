import type { SpecPipeline } from 'src/types'
import { initBar, dataset, xLinear, yBand, percent, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const barPercentSpecPipeline: SpecPipeline = [
  initBar,
  color,
  backgroundColor,
  percent,
  dataset,
  xLinear,
  yBand,
  label,
  tooltip,
  legend,
]
