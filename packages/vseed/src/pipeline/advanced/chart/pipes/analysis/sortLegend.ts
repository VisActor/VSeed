import type { AdvancedPipe, Line } from 'src/types'
import { calcOrder } from './common'

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
