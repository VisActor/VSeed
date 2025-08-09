import type { SpecPipeline } from 'src/types'
import {
  initColumn,
  dataset,
  xBand,
  yLinear,
  percent,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  datasetPivotPlaceholder,
  pivotAdapter,
  initPivot,
  datasetPivot,
  pivotIndicators,
  pivotDiscreteLegend,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  stackInverse,
} from '../pipes'

const columnPercent: SpecPipeline = [
  initColumn,
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

const pivotColumnPercent: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initColumn,
    stackInverse,
    color,
    percent,
    backgroundColor,
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

export const columnPercentSpecPipeline: SpecPipeline = [pivotAdapter(columnPercent, pivotColumnPercent)]
