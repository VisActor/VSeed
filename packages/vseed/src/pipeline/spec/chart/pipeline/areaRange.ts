import type { SpecPipeline } from 'src/types'
import {
  datasetXY,
  xBand,
  yLinear,
  backgroundColor,
  label,
  datasetPivot,
  pivotIndicators,
  pivotAdapter,
  initPivot,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotColumnDimensions,
  pivotRowDimensions,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
  verticalCrosshairLine,
  initAreaRange,
  series,
  lineStyle,
  pointStyle,
  pointStateDimensionHover,
  areaStyle,
} from '../pipes'
import { initAreaRangeLine1, initAreaRangeLine2 } from '../pipes/init/areaRange'

const areaRange: SpecPipeline = [
  series(
    [initAreaRange, areaStyle],
    [initAreaRangeLine1, lineStyle, pointStyle, pointStateDimensionHover],
    [initAreaRangeLine2, lineStyle, pointStyle, pointStateDimensionHover],
  ),
  datasetXY,
  backgroundColor,
  xBand,
  yLinear,
  label,
  verticalCrosshairLine,
  annotationPoint,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationArea,
]

const pivotAreaRange: SpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    series(
      [initAreaRange, areaStyle],
      [initAreaRangeLine1, lineStyle, pointStyle, pointStateDimensionHover],
      [initAreaRangeLine2, lineStyle, pointStyle, pointStateDimensionHover],
    ),
    backgroundColor,
    datasetXY,
    xBand,
    yLinear,
    label,
    verticalCrosshairLine,
    annotationPoint,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationArea,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
]

export const areaRangeSpecPipeline = [pivotAdapter(areaRange, pivotAreaRange)]
