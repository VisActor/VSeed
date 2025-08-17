import type { SpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  dataset,
  datasetPivot,
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
  initFunnel,
} from '../pipes'

const funnel: SpecPipeline = [
  initFunnel,
  color,
  backgroundColor,
  dataset,
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
    color,
    backgroundColor,
    dataset,
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

export const funnelSpecPipeline: SpecPipeline = [pivotAdapter(funnel, pivotFunnel)]
