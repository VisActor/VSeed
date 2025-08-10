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
  discreteLegend,
  pivotAdapter,
  pivotColumnDimensions,
  pivotGridStyle,
  pivotIndicators,
  pivotIndicatorsAsRow,
  pivotDiscreteLegend,
  pivotRowDimensions,
  tooltip,
  annotationPoint,
} from '../pipes'

const pie: SpecPipeline = [initPie, color, backgroundColor, dataset, label, tooltip, discreteLegend, annotationPoint]

const pivotPie: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([initPie, color, backgroundColor, datasetPivotPlaceholder, label, tooltip, annotationPoint]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const pieSpecPipeline: SpecPipeline = [pivotAdapter(pie, pivotPie)]
