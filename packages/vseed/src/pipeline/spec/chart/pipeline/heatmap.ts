import type { SpecPipeline } from 'src/types'
import {
  datasetXY,
  backgroundColor,
  label,
  tooltip,
  initPivot,
  datasetPivot,
  pivotIndicators,
  pivotAdapter,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotColumnDimensions,
  pivotRowDimensions,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
  pointStyle,
  lineStyle,
  pointStateDimensionHover,
  labelColorInversion,
  discreteLegend,
} from '../pipes'
import { initHeatmap } from '../pipes/init/heatmap'

const heatmap: SpecPipeline = [
  initHeatmap,
  backgroundColor,
  datasetXY,
  label,
  labelColorInversion,
  discreteLegend,
  tooltip,
  pointStyle,
  pointStateDimensionHover,
  lineStyle,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
]

const pivotHeatmap: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initHeatmap,
    backgroundColor,
    datasetXY,
    label,
    labelColorInversion,
    discreteLegend,
    tooltip,
    pointStyle,
    pointStateDimensionHover,
    lineStyle,
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationArea,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
]

export const heatmapSpecPipeline: SpecPipeline = [pivotAdapter(heatmap, pivotHeatmap)]
