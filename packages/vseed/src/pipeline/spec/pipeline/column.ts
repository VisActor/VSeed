import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const columnSpecPipeline: SpecPipeline = [
  initColumn,
  color,
  backgroundColor,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  legend,
]
