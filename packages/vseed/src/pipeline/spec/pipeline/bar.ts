import type { SpecPipeline } from 'src/types'
import {
  initBar,
  dataset,
  xLinear,
  yBand,
  backgroundColor,
  label,
  tooltip,
  legend,
  color,
  pivotAdapter,
  initPivot,
  datasetPivot,
  pivotIndicators,
  pivotLegend,
  datasetPivotPlaceholder,
  pivotIndicatorsAsCol,
  pivotGridStyle,
} from '../pipes'

const bar: SpecPipeline = [initBar, color, backgroundColor, dataset, xLinear, yBand, label, tooltip, legend]

const pivotBar: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([initBar, color, backgroundColor, datasetPivotPlaceholder, yBand, label, label, tooltip]),
  pivotLegend,
]

export const barSpecPipeline: SpecPipeline = [pivotAdapter(bar, pivotBar)]
