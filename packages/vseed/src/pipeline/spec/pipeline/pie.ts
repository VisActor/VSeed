import type { SpecPipeline } from 'src/types'
import {
  backgroundColor,
  color,
  dataset,
  datasetPivot,
  datasetPivotPlaceholder,
  initPie,
  initPivot,
  label,
  legend,
  pivotAdapter,
  pivotColumnDimensions,
  pivotGridStyle,
  pivotIndicators,
  pivotIndicatorsAsRow,
  pivotLegend,
  pivotRowDimensions,
  tooltip,
} from '../pipes'

const pie: SpecPipeline = [initPie, color, backgroundColor, dataset, label, tooltip, legend]

const pivotPie: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initPie, color, backgroundColor, datasetPivotPlaceholder, label, tooltip]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotLegend,
]

export const pieSpecPipeline: SpecPipeline = [pivotAdapter(pie, pivotPie)]
