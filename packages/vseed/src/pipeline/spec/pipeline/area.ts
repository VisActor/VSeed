import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xBand,
  yLinear,
  initArea,
  stackInverse,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  datasetPivotPlaceholder,
  datasetPivot,
  pivotIndicators,
  pivotDiscreteLegend,
  pivotAdapter,
  initPivot,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotColumnDimensions,
  pivotRowDimensions,
} from '../pipes'

const area: SpecPipeline = [
  initArea,
  stackInverse,
  color,
  backgroundColor,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  discreteLegend,
]

const pivotArea: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initArea,
    color,
    backgroundColor,
    stackInverse,
    datasetPivotPlaceholder,
    xBand,
    yLinear,
    label,
    tooltip,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const areaSpecPipeline = [pivotAdapter(area, pivotArea)]
