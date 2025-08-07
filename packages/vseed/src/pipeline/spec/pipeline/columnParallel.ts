import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xBand,
  yLinear,
  initColumnParallel,
  backgroundColor,
  label,
  tooltip,
  legend,
  color,
  pivotIndicators,
  initPivot,
  datasetPivot,
  pivotAdapter,
  datasetPivotPlaceholder,
  pivotLegend,
  pivotIndicatorsAsRow,
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
  legend,
]

const pivotColumnParallel: SpecPipeline = [
  initPivot,
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
  pivotLegend,
]

export const columnParallelSpecPipeline: SpecPipeline = [pivotAdapter(columnParallel, pivotColumnParallel)]
