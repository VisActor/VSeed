import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xBand,
  yLinear,
  initColumnParallel,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  pivotIndicators,
  initPivot,
  datasetPivot,
  pivotAdapter,
  datasetPivotPlaceholder,
  pivotLegend,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
} from '../pipes'

const columnParallel: SpecPipeline = [
  initColumnParallel,
  color,
  backgroundColor,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  discreteLegend,
]

const pivotColumnParallel: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initColumnParallel,
    color,
    backgroundColor,
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

export const columnParallelSpecPipeline: SpecPipeline = [pivotAdapter(columnParallel, pivotColumnParallel)]
