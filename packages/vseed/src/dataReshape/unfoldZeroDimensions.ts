import type { Dataset, Measure } from 'src/types'
import type { UnfoldInfo } from 'src/types'
import { UnfoldDimensionGroup, UnfoldDimensionGroupId } from './constant'
import { unique } from 'remeda'

/**
 * 展开0个维度的特殊情况, 折线图、面积图、雷达图只有指标没有维度的情况, 应该所有的指标应该作为一个维度
 * @description
 */
export const unfoldZeroDimensions = (
  dataset: Dataset,
  measures: Measure[],
  measureName: string,
  unfoldGroupName: string = UnfoldDimensionGroup,
  unfoldGroupId: string = UnfoldDimensionGroupId,
): {
  dataset: Dataset
  unfoldInfo: UnfoldInfo
} => {
  const unfoldInfo: UnfoldInfo = {
    groupName: unfoldGroupName,
    groupId: unfoldGroupId,
    colorItems: [],
    colorIdMap: {},
  }

  // 指标为空或维度为空, 则不检测
  if (measures.length === 0) {
    return {
      dataset,
      unfoldInfo: {
        groupName: unfoldGroupName,
        groupId: unfoldGroupId,
        colorItems: [],
        colorIdMap: {},
      },
    }
  }

  const colorItems = []
  const colorMap: Record<string, string> = {}
  for (let i = 0; i < dataset.length; i++) {
    const datum = dataset[i]
    const colorName = measureName
    const colorId = measureName
    datum[unfoldGroupName] = colorName
    datum[unfoldGroupId] = colorId
    colorItems.push(colorId)
    colorMap[colorId] = colorName
  }

  unfoldInfo.colorItems = unique(colorItems)
  unfoldInfo.colorIdMap = colorMap
  return {
    dataset,
    unfoldInfo,
  }
}
