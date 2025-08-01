import type { Dataset, Datum, Dimension, Measure } from 'src/types'
import type { UnfoldInfo } from 'src/types'
import { FoldDimensionGroup, Separator } from './constant'

/**
 * TODO: 优化展开维度的性能
 * 展开指定的维度
 * @description 第一步: 根据指定的维度, 将多个维度展开为N个指标(取决于维值去重后的数量), 随后合并成一个维度.
 */
export const unfoldDimensions = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  unfoldStartIndex: number = 0,
  foldGroupName: string = FoldDimensionGroup,
  dimensionsSeparator: string = Separator,
): {
  dataset: Dataset
  unfoldInfo: UnfoldInfo
} => {
  if (unfoldStartIndex < 0 || unfoldStartIndex >= dimensions.length) {
    throw new Error('unfoldStartIndex is out of range')
  }

  const dimensionsToBeUnfolded = dimensions.slice(unfoldStartIndex)
  const unfoldInfo: UnfoldInfo = {
    unfoldMap: {},
    colorItems: [],
  }

  // 指标为空或维度为空, 则不检测
  if (dimensions.length === 0 || measures.length === 0) {
    return {
      dataset,
      unfoldInfo: {
        unfoldMap: {},
        colorItems: [],
      },
    }
  }

  const colorItems = []
  for (let i = 0; i < dataset.length; i++) {
    const datum = dataset[i]
    const colorItem = generateDimGroupName(dimensionsToBeUnfolded, datum, dimensionsSeparator)
    datum[foldGroupName] = colorItem
    colorItems.push(colorItem)
  }

  return {
    dataset,
    unfoldInfo,
  }
}

/**
 * 生成维度组合名称
 * @param dimensionsToBeGrouped 待分组的维度
 * @param datum 数据项
 * @param dimensionsSeparator 维度分隔符
 * @returns 维度组合名称
 */
export const generateDimGroupName = (dimensionsToBeGrouped: Dimension[], datum: Datum, dimensionsSeparator: string) => {
  return dimensionsToBeGrouped.map((dim) => String(datum[dim.id])).join(dimensionsSeparator)
}
