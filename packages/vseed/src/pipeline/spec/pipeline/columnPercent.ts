import type { SpecPipeline } from 'src/types'
import {
  initColumn,
  dataset,
  xBand,
  yLinear,
  percent,
  backgroundColor,
  label,
  tooltip,
  legend,
  color,
  datasetPivotPlaceholder,
  pivotAdapter,
  initPivot,
  datasetPivot,
  pivotIndicators,
  pivotLegend,
  pivotIndicatorsAsRow,
  pivotGridStyle,
} from '../pipes'

const columnPercent: SpecPipeline = [
  initColumn,
  color,
  backgroundColor,
  percent,
  dataset,
  xBand,
  yLinear,
  label,
  tooltip,
  legend,
]

const pivotColumnPercent: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initColumn,
    color,
    percent,
    backgroundColor,
    datasetPivotPlaceholder,
    xBand,
    yLinear,
    label,
    tooltip,
  ]),
  pivotLegend,
]

export const columnPercentSpecPipeline: SpecPipeline = [pivotAdapter(columnPercent, pivotColumnPercent)]
