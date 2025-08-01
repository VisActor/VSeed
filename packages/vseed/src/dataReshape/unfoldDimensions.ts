import type { Dataset, Datum, Dimension, Measure } from 'src/types'
import type { UnfoldInfo } from 'src/types'

/**
 * TODO: 优化展开维度的性能
 * 展开指定的维度
 * @description 第一步: 根据指定的维度, 将多个维度展开为N个指标(取决于维值去重后的数量), 随后合并成一个维度.
 */
export const unfoldDimensions = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  unfoldStartIndex = 0,
  dimensionsSeparator = '-',
  measureSeparator = '-',
): {
  dataset: Dataset
  unfoldInfo: UnfoldInfo
} => {
  const dimensionsToBeUnfolded = dimensions.slice(unfoldStartIndex)
  const dimensionsToBeGrouped = dimensions.slice(0, unfoldStartIndex)
  const unfoldInfo: UnfoldInfo = {
    unfoldMap: {},
    newMeasureIds: [],
  }

  // 指标为空或维度为空, 则不检测
  if (dimensions.length === 0 || measures.length === 0) {
    return {
      dataset,
      unfoldInfo: {
        unfoldMap: {},
        newMeasureIds: [],
      },
    }
  }
  if (unfoldStartIndex < 0 || unfoldStartIndex >= dimensions.length) {
    throw new Error('unfoldStartIndex is out of range')
  }

  // 1. 维值去重
  const dimensionGroupNames = Array.from(
    new Set(
      dataset.map((datum) =>
        generateDimGroupName(
          dimensionsToBeUnfolded,
          datum,
          dimensionsSeparator,
        ),
      ),
    ),
  )
  // 2. 指标名称列表
  unfoldInfo.newMeasureIds = dimensionGroupNames.flatMap((dimGroupName) => {
    if (measures.length === 1) {
      return dimGroupName
    }

    return measures.map((mea) => {
      const measureName = mea.alias || mea.id
      return `${dimGroupName}${measureSeparator}${measureName}`
    })
  })
  // 3. 计算有效的分组
  const groups: Record<string, Dataset> = {}
  dataset.forEach((item) => {
    const groupName = generateDimGroupName(
      dimensionsToBeGrouped,
      item,
      dimensionsSeparator,
    )
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(item)
  })
  // 4. 展开维度, 重组数据
  const result = Object.values(groups).map((group: Dataset) => {
    const datum: Datum = {}
    // 补充分组信息
    dimensionsToBeGrouped.forEach((dim) => {
      datum[dim.id] = group[0][dim.id] as unknown
    })
    // 补全指标信息
    dimensionGroupNames.forEach((dimGroupName) => {
      const matchDatum = group.find(
        (datum) =>
          dimensionsToBeUnfolded
            .map((d) => String(datum[d.id]))
            .join(dimensionsSeparator) === dimGroupName,
      )
      Object.assign(datum, matchDatum)
      measures.forEach((mea) => {
        const measureName = mea.alias || mea.id
        const newMeasureId =
          measures.length === 1
            ? dimGroupName
            : `${dimGroupName}${measureSeparator}${measureName}`
        datum[newMeasureId] = (matchDatum?.[mea.id] as unknown) ?? null
      })
    })

    return datum
  })

  debugger
  return {
    dataset: result,
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
export const generateDimGroupName = (
  dimensionsToBeGrouped: Dimension[],
  datum: Datum,
  dimensionsSeparator: string,
) => {
  return dimensionsToBeGrouped
    .map((dim) => String(datum[dim.id]))
    .join(dimensionsSeparator)
}
