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
  pivotLegend,
  datasetPivotPlaceholder,
  pivotIndicatorsAsCol,
  pivotGridStyle,
  pivotColumnDimensions,
  pivotRowDimensions,
} from '../pipes'

const bar: SpecPipeline = [initBar, color, backgroundColor, dataset, xLinear, yBand, label, tooltip, discreteLegend]

const pivotBar: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([initBar, color, backgroundColor, datasetPivotPlaceholder, yBand, label, label, tooltip]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotLegend,
]

export const barSpecPipeline: SpecPipeline = [pivotAdapter(bar, pivotBar)]
