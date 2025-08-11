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
  annotationHorizontalLine,
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
  annotationVerticalLine,
  annotationHorizontalLine
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
    annotationVerticalLine,
    annotationHorizontalLine
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const columnParallelSpecPipeline: SpecPipeline = [pivotAdapter(columnParallel, pivotColumnParallel)]
