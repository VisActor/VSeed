import type { SpecPipeline } from 'src/types'
import {
  initBar,
  dataset,
  xLinear,
  yBand,
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
  pivotColumnDimensions,
  pivotRowDimensions,
  barStyle,
  annotationPoint,
} from '../pipes'

const bar: SpecPipeline = [
  initBar,
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
]

const pivotBar: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([
    initBar,
    color,
    backgroundColor,
    datasetPivotPlaceholder,
    yBand,
    label,
    label,
    tooltip,
    barStyle,
    annotationPoint,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const barSpecPipeline: SpecPipeline = [pivotAdapter(bar, pivotBar)]
