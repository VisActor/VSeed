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
} from '../pipes'

const line: SpecPipeline = [initLine, color, backgroundColor, dataset, xBand, yLinear, label, tooltip, discreteLegend]

const pivotLine: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initLine, color, backgroundColor, datasetPivotPlaceholder, xBand, yLinear, label, tooltip]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const lineSpecPipeline: SpecPipeline = [pivotAdapter(line, pivotLine)]
