import type { Dimensions, MeasureGroup, MeasureTree, VSeed } from 'src/types'

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
    measures: MeasureTree
    dimensions: Dimensions
  }

  const hasRowOrColumnDimension =
    dimensions &&
    dimensions.some((dimension) => dimension.location === 'rowDimension' || dimension.location === 'columnDimension')
  const hasMeasureGroup = measures && measures.find((measure: MeasureGroup) => measure && measure.children)

  return hasRowOrColumnDimension || hasMeasureGroup
}
