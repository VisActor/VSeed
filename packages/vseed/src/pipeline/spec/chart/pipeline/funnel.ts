import type { SpecPipeline } from 'src/types'
import {
  backgroundColor,
  datasetXY,
  datasetPivot,
  initPivot,
  label,
  colorLegend,
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
  linearColor,
} from '../pipes'

const funnel: SpecPipeline = [
  initFunnel,
  linearColor,
  backgroundColor,
  datasetXY,
  label,
  tooltip,
  colorLegend,
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
    linearColor,
    backgroundColor,
    datasetXY,
    label,
    tooltip,
    colorLegend,
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationArea,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
]

export const funnelSpecPipeline: SpecPipeline = [pivotAdapter(funnel, pivotFunnel)]
