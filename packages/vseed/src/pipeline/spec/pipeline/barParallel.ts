import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xLinear,
  yBand,
  initBarParallel,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  datasetPivotPlaceholder,
  initPivot,
  datasetPivot,
  pivotDiscreteLegend,
  pivotIndicators,
  pivotAdapter,
  pivotIndicatorsAsCol,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  barStyle,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
} from '../pipes'

const barParallel: SpecPipeline = [
  initBarParallel,
  color,
  backgroundColor,
  dataset,
  xLinear,
  yBand,
  label,
  tooltip,
  discreteLegend,
  barStyle,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine
]

const pivotBarParallel: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([
    initBarParallel,
    color,
    backgroundColor,
    datasetPivotPlaceholder,
    yBand,
    xLinear,
    label,
    tooltip,
    barStyle,
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const barParallelSpecPipeline: SpecPipeline = [pivotAdapter(barParallel, pivotBarParallel)]
