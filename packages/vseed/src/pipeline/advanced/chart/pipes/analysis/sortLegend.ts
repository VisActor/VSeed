import { sort, unique } from 'remeda'
import type { AdvancedPipe, Dataset, Datum, Line, SortLegend } from 'src/types'

export const sortLegend: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sortLegend } = vseed as Line
  const { datasetReshapeInfo, dataset } = advancedVSeed
  const colorId = datasetReshapeInfo?.[0]?.unfoldInfo?.encodingColorId
  const colorIdMap = datasetReshapeInfo?.[0]?.unfoldInfo?.colorIdMap
  const colorItems = datasetReshapeInfo?.[0]?.unfoldInfo?.colorItems
  if (!sortLegend || !colorId || !colorIdMap || !colorItems) {
    return advancedVSeed
  }

  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  if (sortLegend.customOrder) {
    const nameMap = Object.keys(colorIdMap).reduce<Record<string, string>>((pre, cur) => {
      pre[colorIdMap[cur]] = cur
      return pre
    }, {})

    // 先根据名称匹配, 若名称不存在, 则根据id匹配, 从而兼容名称和id的两种情况
    const orderRes = sortLegend.customOrder.map((itemNameOrId) =>
      nameMap[itemNameOrId] ? nameMap[itemNameOrId] : itemNameOrId,
    )
    result.analysis.orderMapping[colorId] = orderRes
    return result
  }

  const orderRes = calcOrder(sortLegend, colorId, dataset?.flat(2) || [])
  result.analysis.orderMapping[colorId] = orderRes

  return result
}

const calcOrder = (sortConfig: SortLegend, id: string, dataset: Dataset): string[] => {
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
