import type { Dimensions, DimensionGroup, DimensionTree, VSeed } from 'src/types'

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
