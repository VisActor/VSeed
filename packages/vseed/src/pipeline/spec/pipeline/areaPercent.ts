import type { SpecPipeline } from 'src/types'
import {
  percent,
  dataset,
  xBand,
  yLinear,
  initArea,
  backgroundColor,
  label,
  tooltip,
  legend,
  color,
  datasetPivotPlaceholder,
  datasetPivot,
  pivotIndicators,
  pivotLegend,
  pivotAdapter,
  initPivot,
  pivotIndicatorsAsRow,
} from '../pipes'

const areaPercent: SpecPipeline = [
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

const pivotAreaPercent: SpecPipeline = [
  initPivot,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initArea, color, backgroundColor, percent, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotLegend,
]

export const areaPercentSpecPipeline = [pivotAdapter(areaPercent, pivotAreaPercent)]
