import type { SpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  datasetXY,
  datasetPivot,
  initDonut,
  initPivot,
  label,
  discreteLegend,
  pivotAdapter,
  pivotColumnDimensions,
  pivotGridStyle,
  pivotIndicators,
  pivotIndicatorsAsRow,
  pivotDiscreteLegend,
  pivotRowDimensions,
  tooltip,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
  progressive,
} from '../pipes'

const donut: SpecPipeline = [
  initDonut,
  color,
  backgroundColor,
  datasetXY,
  progressive,
  label,
  tooltip,
  discreteLegend,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
]

const pivotDonut: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initDonut,
    color,
    backgroundColor,
    datasetXY,
    progressive,
    label,
    tooltip,
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationArea,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const donutSpecPipeline: SpecPipeline = [pivotAdapter(donut, pivotDonut)]
