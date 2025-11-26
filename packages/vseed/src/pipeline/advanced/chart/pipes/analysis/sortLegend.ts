import type { AdvancedPipe, Line } from 'src/types'
import { calcOrder } from './common'

export const sortLegend: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { sortLegend } = vseed as Line
  const { datasetReshapeInfo, dataset } = advancedVSeed
  const colorId = datasetReshapeInfo?.[0]?.unfoldInfo?.encodingColorId
  const colorIdMap = datasetReshapeInfo?.[0]?.unfoldInfo?.colorIdMap ?? {}
  const colorItems = datasetReshapeInfo?.[0]?.unfoldInfo?.colorItems
  if (!sortLegend || !colorId || !colorIdMap || !colorItems) {
    return advancedVSeed
  }

  if (!result.analysis) result.analysis = {}
  if (!result.analysis.orderMapping) result.analysis.orderMapping = {}

  if (sortLegend.customOrder) {
    const colorIds = Object.keys(colorIdMap)
    // 先根据名称匹配, 若名称不存在, 则根据id匹配, 从而兼容名称和id的两种情况
    const orderRes = sortLegend.customOrder.map((itemNameOrId) => {
      return colorIds.find((id) => {
        return colorIdMap[id]?.alias === itemNameOrId || colorIdMap[id]?.id === itemNameOrId || id === itemNameOrId
      }) as string
    })
    result.analysis.orderMapping[colorId] = orderRes
    return result
  }

  const orderRes = calcOrder(sortLegend, colorId, dataset?.flat(2) || [])
  result.analysis.orderMapping[colorId] = orderRes

  return result
}
