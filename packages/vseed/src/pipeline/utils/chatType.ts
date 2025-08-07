import type { AdvancedVSeed, ChartType, MeasureGroup, VSeed } from 'src/types'

export const isVTable = (chartType: ChartType) => {
  return ['table', 'pivotTable'].includes(chartType)
}

export const isVChart = (chartType: ChartType) => {
  return !isVTable(chartType)
}

export const isPivotChart = (vseed: VSeed | AdvancedVSeed) => {
  const { measures, dimensions } = vseed
  
  const hasRowOrColumnDimension =
    dimensions &&
    dimensions.some((dimension) => dimension.location === 'rowDimension' || dimension.location === 'columnDimension')
  const hasMeasureGroup = measures && measures.find((measure: MeasureGroup) => measure && measure.children)

  return hasRowOrColumnDimension || hasMeasureGroup
}
