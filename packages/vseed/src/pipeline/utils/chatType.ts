import type { Dimensions, DimensionGroup, DimensionTree, VSeed, Measure } from 'src/types'
import { measureDepth } from './measures'
import { isMeasureTreeWithChildren, isMeasureTreeWithParentId } from '../advanced/chart/pipes/measures/utils'

export const isTable = (vseed: VSeed) => {
  return vseed.chartType === 'table'
}
export const isPivotTable = (vseed: VSeed) => {
  return vseed.chartType === 'pivotTable'
}
export const isVTable = (vseed: VSeed) => {
  return ['table', 'pivotTable'].includes(vseed.chartType)
}
export const isVChart = (vseed: VSeed): boolean => {
  return !isVTable(vseed)
}
export const isPivotChart = (vseed: VSeed) => {
  if (isVTable(vseed)) {
    return false
  }

  if (vseed.chartType === 'dualAxis' || vseed.chartType === 'scatter') {
    const { dimensions = [] } = vseed as {
      dimensions: Dimensions
    }
    const hasRowOrColumnDimension =
      dimensions &&
      dimensions.some((dimension) => dimension.location === 'rowDimension' || dimension.location === 'columnDimension')

    if (hasRowOrColumnDimension) {
      return true
    }

    if (vseed.chartType === 'scatter') {
      if (isMeasureTreeWithChildren(vseed)) {
        const depth = measureDepth(vseed.measures)
        return depth === 3
      }

      if (isMeasureTreeWithParentId(vseed)) {
        const parentIds = vseed.measures?.map((measure: Measure) => measure.parentId)
        return parentIds && parentIds.length > 1
      }

      if (vseed.scatterMeasures && vseed.scatterMeasures.length > 1) {
        return true
      }
      return false
    }
    if (vseed.chartType === 'dualAxis') {
      if (isMeasureTreeWithChildren(vseed)) {
        const depth = measureDepth(vseed.measures)
        return depth === 3
      }

      if (isMeasureTreeWithParentId(vseed)) {
        const parentIds = vseed.measures?.map((measure: Measure) => measure.parentId)
        return parentIds && parentIds.length > 1
      }

      if (vseed.dualMeasures && vseed.dualMeasures.length > 1) {
        return true
      }
    }

    return false
  }

  const { measures = [], dimensions = [] } = vseed as {
    measures: DimensionTree
    dimensions: Dimensions
  }

  const hasRowOrColumnDimension =
    dimensions &&
    dimensions.some((dimension) => dimension.location === 'rowDimension' || dimension.location === 'columnDimension')

  const hasMeasureGroup = measures && measures.some((measure: DimensionGroup) => measure && measure.children)

  return hasRowOrColumnDimension || hasMeasureGroup
}
