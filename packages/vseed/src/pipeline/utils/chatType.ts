import { type Dimensions, type DimensionGroup, type DimensionTree, type VSeed, type Measure } from 'src/types'
import { measureDepth } from './measures'
import { isMeasureTreeWithChildren, isMeasureTreeWithParentId } from '../advanced/chart/pipes/measures/utils'
import { unique } from 'remeda'
import { ChartTypeEnum, DEFAULT_PARENT_ID } from './constant'

export const isTable = (vseed: VSeed) => {
  return vseed.chartType === ChartTypeEnum.Table
}
export const isPivotTable = (vseed: VSeed) => {
  return vseed.chartType === ChartTypeEnum.PivotTable
}
export const isRadar = (vseed: VSeed) => {
  return vseed.chartType === ChartTypeEnum.Radar
}
export const isAreaPercent = (vseed: VSeed) => {
  return vseed.chartType === ChartTypeEnum.AreaPercent
}
export const isColumnPercent = (vseed: VSeed) => {
  return vseed.chartType === ChartTypeEnum.ColumnPercent
}
export const isBarPercent = (vseed: VSeed) => {
  return vseed.chartType === ChartTypeEnum.BarPercent
}

export const isBarLikeChart = (vseed: VSeed) => {
  return (
    vseed.chartType === ChartTypeEnum.Bar ||
    vseed.chartType === ChartTypeEnum.BarPercent ||
    vseed.chartType === ChartTypeEnum.BarParallel
  )
}

export const isVTable = (vseed: VSeed) => {
  return ['table', 'pivotTable'].includes(vseed.chartType)
}
export const isVChart = (vseed: VSeed): boolean => {
  return !isVTable(vseed)
}

/**
 * @description 透视图表或组合图
 * - 透视图表定义: 存在 column 或 row的 encoding
 * - 组合图表定义: 存在多组指标的情况
 * - 透视组合图表: 存在 column 或 row的 encoding 且 存在多组指标的情况
 * 上述三者都只能使用 VTable.PivotChart 绘制
 */
export const isPivotChart = (vseed: VSeed) => {
  if (isVTable(vseed)) {
    return false
  }

  if (isPivot(vseed)) {
    return true
  }

  return isCombination(vseed)
}

/**
 * @description 存在column 或 row的encoding
 */
export const isPivot = (vseed: VSeed) => {
  const { dimensions = [] } = vseed as {
    dimensions: Dimensions
  }

  return dimensions && dimensions.some((dimension) => dimension.encoding === 'row' || dimension.encoding === 'column')
}
/**
 * @description 不存在column 或 row的encoding, 但是有多组指标的情况
 */
export const isCombination = (vseed: VSeed) => {
  if (isMeasureTreeWithParentId(vseed.measures)) {
    const parentIds = vseed.measures?.map((measure: Measure) => measure.parentId || DEFAULT_PARENT_ID)
    return parentIds && unique(parentIds).length > 1
  }

  if (vseed.chartType === 'dualAxis' || vseed.chartType === 'scatter') {
    if (vseed.chartType === 'scatter') {
      if (isMeasureTreeWithChildren(vseed.measures)) {
        const depth = measureDepth(vseed.measures)
        return depth === 3
      }

      if (vseed.scatterMeasures && vseed.scatterMeasures.length > 1) {
        return true
      }
      return false
    }
    if (vseed.chartType === 'dualAxis') {
      if (isMeasureTreeWithChildren(vseed.measures)) {
        const depth = measureDepth(vseed.measures)
        return depth === 3
      }

      if (vseed.dualMeasures && vseed.dualMeasures.length > 1) {
        return true
      }
    }

    return false
  }

  const { measures = [] } = vseed as {
    measures: DimensionTree
    dimensions: Dimensions
  }

  const hasMeasureGroup = measures && measures.some((measure: DimensionGroup) => measure && measure.children)

  return hasMeasureGroup
}
