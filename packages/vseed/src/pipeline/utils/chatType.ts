import type { AdvancedVSeed, MeasureGroup, VSeed } from 'src/types'

export const isVTable = (vseed: VSeed) => {
  return ['table', 'pivotTable'].includes(vseed.chartType)
}

export const isVChart = (vseed: VSeed): boolean => {
  return !isVTable(vseed)
}

export const isPivotChart = (vseed: VSeed | AdvancedVSeed) => {
  const { measures, dimensions } = vseed

  const hasRowOrColumnDimension =
    dimensions &&
    dimensions.some((dimension) => dimension.location === 'rowDimension' || dimension.location === 'columnDimension')
  const hasMeasureGroup = measures && measures.find((measure: MeasureGroup) => measure && measure.children)

  return hasRowOrColumnDimension || hasMeasureGroup
}
