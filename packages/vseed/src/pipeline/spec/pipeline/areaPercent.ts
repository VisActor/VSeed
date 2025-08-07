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
  pivotGridStyle,
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
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initArea, color, backgroundColor, percent, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotLegend,
]

export const areaPercentSpecPipeline = [pivotAdapter(areaPercent, pivotAreaPercent)]
