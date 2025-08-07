import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xBand,
  yLinear,
  initArea,
  stack,
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

const area: SpecPipeline = [initArea, color, backgroundColor, stack, dataset, xBand, yLinear, label, tooltip, legend]

const pivotArea: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initArea, color, backgroundColor, stack, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotLegend,
]

export const areaSpecPipeline = [pivotAdapter(area, pivotArea)]
