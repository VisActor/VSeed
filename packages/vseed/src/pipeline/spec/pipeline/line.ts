import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xBand,
  yLinear,
  initLine,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  initPivot,
  datasetPivot,
  datasetPivotPlaceholder,
  pivotDiscreteLegend,
  pivotIndicators,
  pivotAdapter,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotColumnDimensions,
  pivotRowDimensions,
  annotationPoint,
  annotationVerticalLine,
} from '../pipes'

const line: SpecPipeline = [
  initLine,
  color,
  backgroundColor,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  discreteLegend,
  annotationPoint,
  annotationVerticalLine
]

const pivotLine: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initLine,
    color,
    backgroundColor,
    datasetPivotPlaceholder,
    xBand,
    yLinear,
    label,
    tooltip,
    annotationPoint,
    annotationVerticalLine
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const lineSpecPipeline: SpecPipeline = [pivotAdapter(line, pivotLine)]
