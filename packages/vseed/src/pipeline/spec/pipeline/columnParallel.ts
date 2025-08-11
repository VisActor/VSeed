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
  pivotDiscreteLegend,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  barStyle,
  annotationPoint,
  annotationVerticalLine,
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
  barStyle,
  annotationPoint,
  annotationVerticalLine
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
    barStyle,
    annotationPoint,
    annotationVerticalLine
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const columnParallelSpecPipeline: SpecPipeline = [pivotAdapter(columnParallel, pivotColumnParallel)]
