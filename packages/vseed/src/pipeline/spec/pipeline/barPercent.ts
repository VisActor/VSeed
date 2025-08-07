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
  legend,
]

const pivotBarPercent: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([initBar, color, backgroundColor, percent, datasetPivotPlaceholder, yBand, xLinear, label, tooltip]),
  pivotLegend,
]

export const barPercentSpecPipeline: SpecPipeline = [pivotAdapter(barPercent, pivotBarPercent)]
