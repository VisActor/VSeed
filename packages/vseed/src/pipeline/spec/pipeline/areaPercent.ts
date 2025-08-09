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
  discreteLegend,
  color,
  datasetPivotPlaceholder,
  datasetPivot,
  pivotIndicators,
  pivotLegend,
  pivotAdapter,
  initPivot,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  stackInverse,
} from '../pipes'

const areaPercent: SpecPipeline = [
  initArea,
  stackInverse,
  color,
  backgroundColor,
  percent,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  discreteLegend,
]

const pivotAreaPercent: SpecPipeline = [
  initPivot,

  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initArea,
    stackInverse,
    color,
    backgroundColor,
    percent,
    datasetPivotPlaceholder,
    xBand,
    yLinear,
    label,
    tooltip,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotLegend,
]

export const areaPercentSpecPipeline = [pivotAdapter(areaPercent, pivotAreaPercent)]
