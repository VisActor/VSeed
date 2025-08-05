import type { SpecPipeline } from 'src/types'
import { percent, dataset, xBand, yLinear, initArea, backgroundColor, label, tooltip, legend, color } from '../pipes'

export const areaPercentSpecPipeline: SpecPipeline = [
  initArea,
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
