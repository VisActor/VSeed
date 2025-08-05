import type { SpecPipeline } from 'src/types'
import { initColumn, dataset, xBand, yLinear, percent, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const columnPercentSpecPipeline: SpecPipeline = [
  initColumn,
  color,
  backgroundColor,
  percent,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  legend,
]
