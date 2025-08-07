import type { SpecPipeline } from 'src/types'
import {
  initColumn,
  dataset,
  xBand,
  yLinear,
  backgroundColor,
  label,
  tooltip,
  legend,
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
} from '../pipes'

const column: SpecPipeline = [initColumn, color, backgroundColor, dataset, xBand, yLinear, label, tooltip, legend]

const pivotColumn: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initColumn, color, backgroundColor, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotLegend,
]

export const columnSpecPipeline = [pivotAdapter(column, pivotColumn)]
