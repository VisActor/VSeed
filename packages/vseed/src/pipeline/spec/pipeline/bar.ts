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
]

const pivotBar: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([initBar, color, backgroundColor, datasetPivotPlaceholder, yBand, label, label, tooltip, barStyle]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const barSpecPipeline: SpecPipeline = [pivotAdapter(bar, pivotBar)]
