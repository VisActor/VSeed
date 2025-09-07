import { sort, unique } from 'remeda'
import type { AdvancedPipe, Dataset, DatasetReshapeInfo, Datum, Line, Sort, SortLegend } from 'src/types'

export const sortXBandAxis: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sort: sortAxis, dataset } = vseed as Line
  const { datasetReshapeInfo } = advancedVSeed as { datasetReshapeInfo: DatasetReshapeInfo }
  const { unfoldInfo } = datasetReshapeInfo[0]
  const xField = unfoldInfo.encodingX
  if (!sortAxis || !xField) {
    return advancedVSeed
  }
  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  const axisOrderResult = calcOrder(sortAxis, xField, dataset)

  result.analysis.orderMapping[xField] = axisOrderResult

  return result
}

export const sortYBandAxis: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sort: sortAxis, dataset } = vseed as Line
  const { datasetReshapeInfo } = advancedVSeed as { datasetReshapeInfo: DatasetReshapeInfo }
  const { unfoldInfo } = datasetReshapeInfo[0]
  const yField = unfoldInfo?.encodingY
  if (!sortAxis || !yField) {
    return advancedVSeed
  }
  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  const axisOrderResult = calcOrder(sortAxis, yField, dataset)

  result.analysis.orderMapping[yField] = axisOrderResult

  return result
}

export const sortLegend: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sortLegend } = vseed as Line
  const { datasetReshapeInfo } = advancedVSeed
  const groupField = datasetReshapeInfo?.[0]?.unfoldInfo?.groupId
  const colorIdMap = datasetReshapeInfo?.[0]?.unfoldInfo?.colorIdMap
  const colorItems = datasetReshapeInfo?.[0]?.unfoldInfo?.colorItems
  if (!sortLegend || !groupField || !colorIdMap || !colorItems) {
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
    result.analysis.orderMapping[groupField] = orderRes
    return result
  }

  const dataset = advancedVSeed.dataset?.flat(2)

  const orderRes = calcOrder(sortLegend, groupField, dataset || [])
  result.analysis.orderMapping[groupField] = orderRes

  return result
}

const calcOrder = (sortConfig: Sort | SortLegend, id: string, dataset: Dataset): string[] => {
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
