import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xLinear,
  yBand,
  initBarParallel,
  backgroundColor,
  label,
  tooltip,
  legend,
  color,
  datasetPivotPlaceholder,
  initPivot,
  datasetPivot,
  pivotLegend,
  pivotIndicators,
  pivotAdapter,
  pivotIndicatorsAsCol,
} from '../pipes'

const barParallel: SpecPipeline = [
  initBarParallel,
  color,
  backgroundColor,
  dataset,
  xLinear,
  yBand,
  label,
  tooltip,
  legend,
]

const pivotBarParallel: SpecPipeline = [
  initPivot,
  pivotIndicatorsAsCol,
  datasetPivot,
  pivotIndicators([initBarParallel, color, backgroundColor, datasetPivotPlaceholder, yBand, xLinear, label, tooltip]),
  pivotLegend,
]

export const barParallelSpecPipeline: SpecPipeline = [pivotAdapter(barParallel, pivotBarParallel)]
