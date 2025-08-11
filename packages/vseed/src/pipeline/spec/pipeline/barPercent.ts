import type { SpecPipeline } from 'src/types'
import {
  initBar,
  dataset,
  xLinear,
  yBand,
  percent,
  backgroundColor,
  label,
  tooltip,
  discreteLegend,
  color,
  pivotAdapter,
  initPivot,
  datasetPivot,
  pivotIndicators,
  pivotDiscreteLegend,
  datasetPivotPlaceholder,
  pivotIndicatorsAsCol,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  barStyle,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
} from '../pipes'

const barPercent: SpecPipeline = [
  initBar,
  color,
  backgroundColor,
  percent,
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

const pivotBarPercent: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([
    initBar,
    color,
    backgroundColor,
    percent,
    datasetPivotPlaceholder,
    yBand,
    xLinear,
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

export const barPercentSpecPipeline: SpecPipeline = [pivotAdapter(barPercent, pivotBarPercent)]
