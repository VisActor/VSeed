import { sort, unique } from 'remeda'
import type { AdvancedPipe, Dataset, DatasetReshapeInfo, Datum, Line, Sort } from 'src/types'

export const sortXBandAxis: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sort: sortAxis } = vseed as Line
  const { datasetReshapeInfo, dataset } = advancedVSeed as { datasetReshapeInfo: DatasetReshapeInfo; dataset: Dataset }
  const { unfoldInfo } = datasetReshapeInfo[0]
  const xField = unfoldInfo.encodingX
  if (!sortAxis || !xField) {
    return advancedVSeed
  }
  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  const axisOrderResult = calcOrder(sortAxis, xField, dataset.flat(2))

  result.analysis.orderMapping[xField] = axisOrderResult

  return result
}

export const calcOrder = (sortConfig: Sort, id: string, dataset: Dataset): string[] => {
  if (sortConfig.customOrder) {
    return sortConfig.customOrder
  }

  const order = sortConfig.order || 'asc'
  const orderBy = sortConfig.orderBy

  const res = sort(dataset, (a, b) => {
    const aValue = a[orderBy || id] as string | number
    const bValue = b[orderBy || id] as string | number

    if (order === 'asc') {
      if (aValue < bValue) {
        return -1
      }
      if (aValue > bValue) {
        return 1
      }
      return 0
    }
    if (aValue > bValue) {
      return -1
    }
    if (aValue < bValue) {
      return 1
    }
    return 0
  })

  return unique(res.map((item: Datum) => item[id] as string))
}
