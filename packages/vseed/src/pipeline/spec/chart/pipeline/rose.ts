import type { SpecPipeline } from 'src/types'
import {
  dataset,
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
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotRowDimensions,
  pivotColumnDimensions,
  stackInverse,
  verticalCrosshairRect,
  stackCornerRadius,
  initRose,
  radiusAxis,
  angleAxis,
} from '../pipes'

const rose: SpecPipeline = [
  initRose,
  stackCornerRadius,
  stackInverse,
  color,
  backgroundColor,
  dataset,
  radiusAxis,
  angleAxis,
  label,
  tooltip,
  verticalCrosshairRect,
  discreteLegend,
]

const pivotRose: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    initRose,
    stackCornerRadius,
    stackInverse,
    color,
    backgroundColor,
    dataset,
    radiusAxis,
    angleAxis,
    label,
    tooltip,
    verticalCrosshairRect,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotDiscreteLegend,
]

export const roseSpecPipeline = [pivotAdapter(rose, pivotRose)]
