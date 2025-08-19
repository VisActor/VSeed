import type { SpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  datasetXY,
  datasetPivot,
  initPie,
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
} from '../pipes'

const pie: SpecPipeline = [
  initPie,
  color,
  backgroundColor,
  datasetXY,
  label,
  tooltip,
  discreteLegend,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
]

const pivotPie: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initPie,
    color,
    backgroundColor,
    datasetXY,
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

export const pieSpecPipeline: SpecPipeline = [pivotAdapter(pie, pivotPie)]
