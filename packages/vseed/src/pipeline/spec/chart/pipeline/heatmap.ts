import type { SpecPipeline } from 'src/types'
import {
  datasetXY,
  backgroundColor,
  label,
  tooltipHeatmap,
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
  discreteLegend,
  color,
  colorAdapter,
  linearColor,
  colorLegend,
  cellStyle,
  colorCellStyleFill,
  pivotDiscreteLegend,
  pivotColorLegend,
} from '../pipes'
import { initHeatmap } from '../pipes/init/heatmap'

const heatmap: SpecPipeline = [
  initHeatmap,
  backgroundColor,
  datasetXY,
  colorAdapter(color, linearColor),
  label,
  colorAdapter(discreteLegend, colorLegend),
  colorCellStyleFill(cellStyle),
  tooltipHeatmap,
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
    colorAdapter(color, linearColor),
    label,
    tooltipHeatmap,
    colorCellStyleFill(cellStyle),
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationArea,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  colorAdapter(pivotDiscreteLegend, pivotColorLegend),
]

export const heatmapSpecPipeline: SpecPipeline = [pivotAdapter(heatmap, pivotHeatmap)]
