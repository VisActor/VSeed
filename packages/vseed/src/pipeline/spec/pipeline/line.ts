import type { SpecPipeline } from 'src/types'
import {
  dataset,
  xBand,
  yLinear,
  initLine,
  backgroundColor,
  label,
  tooltip,
  legend,
  color,
  initPivot,
  datasetPivot,
  datasetPivotPlaceholder,
  pivotLegend,
  pivotIndicators,
  pivotAdapter,
  pivotIndicatorsAsRow,
} from '../pipes'

const line: SpecPipeline = [initLine, color, backgroundColor, dataset, xBand, yLinear, label, tooltip, legend]

const pivotLine: SpecPipeline = [
  initPivot,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initLine, color, backgroundColor, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotLegend,
]

export const lineSpecPipeline: SpecPipeline = [pivotAdapter(line, pivotLine)]
