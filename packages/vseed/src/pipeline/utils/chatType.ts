import type { ChartType } from 'src/types'

export const isVTable = (chartType: ChartType) => {
  return ['table', 'pivotTable'].includes(chartType)
}

export const isVChart = (chartType: ChartType) => {
  return !isVTable(chartType)
}
