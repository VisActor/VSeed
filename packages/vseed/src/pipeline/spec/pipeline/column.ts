import type { SpecPipeline } from 'src/types'
import {
  initColumn,
  dataset,
  xBand,
  yLinear,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  pivotAdapter,
  initPivot,
  datasetPivot,
  datasetPivotPlaceholder,
  pivotIndicators,
  pivotLegend,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  stackInverse,
} from '../pipes'

const column: SpecPipeline = [
  initColumn,
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

const pivotColumn: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initColumn, stackInverse, color, backgroundColor, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotLegend,
]

export const columnSpecPipeline = [pivotAdapter(column, pivotColumn)]
