import type { SpecPipeline } from 'src/types'
import {
  backgroundColor,
  datasetXY,
  datasetPivot,
  initPivot,
  label,
  pivotAdapter,
  pivotColumnDimensions,
  pivotGridStyle,
  pivotIndicators,
  pivotIndicatorsAsRow,
  pivotRowDimensions,
  tooltip,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
  initFunnel,
  discreteLegend,
} from '../pipes'

const funnel: SpecPipeline = [
  initFunnel,
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

const pivotFunnel: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initFunnel,
    backgroundColor,
    datasetXY,
    label,
    tooltip,
    discreteLegend,
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationArea,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
]

export const funnelSpecPipeline: SpecPipeline = [pivotAdapter(funnel, pivotFunnel)]
