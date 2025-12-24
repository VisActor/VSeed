import type { MeasureEncoding, Measures } from 'src/types'
import { type Dimensions, type DimensionGroup, type VSeed, type Measure } from 'src/types'
import { isPositionMeasure } from './measures'
import { isCommonMeasureEncoding, isMeasureTreeWithParentId } from '../advanced/chart/pipes/measures/utils'
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
  const { dimensions = [], measures = [] } = vseed as {
    dimensions: Dimensions
    measures: Measures
  }

  if (dimensions && dimensions.some((dimension) => dimension.encoding === 'row' || dimension.encoding === 'column')) {
    return true
  }

  if (
    vseed.chartType === ChartTypeEnum.Scatter &&
    (measures.filter((m: Measure) => m.encoding === 'xAxis').length > 1 ||
      measures.filter((m: Measure) => m.encoding === 'yAxis').length > 1)
  ) {
    const xCount = measures.filter((m: Measure) => m.encoding === 'xAxis').length
    const yCount = measures.filter((m: Measure) => m.encoding === 'yAxis').length
    const otherCount = measures.filter(
      (m: Measure) =>
        !['size', 'xAxis', 'yAxis'].includes(m.encoding as string) &&
        isCommonMeasureEncoding(m.encoding as MeasureEncoding),
    ).length
    const finalXCount = xCount > 0 ? xCount : otherCount > 0 ? 1 : 0
    const finalYCount = xCount > 0 ? yCount + otherCount : yCount + Math.max(otherCount - 1, 0)

    if (finalXCount > 1 || finalYCount > 1) return true
  }

  return false
}

/**
 * @description 不存在column 或 row的encoding, 但是有多组指标的情况
 */
export const isCombination = (vseed: VSeed) => {
  if (isMeasureTreeWithParentId(vseed.measures)) {
    const parentIds = vseed.measures
      ?.filter(isPositionMeasure)
      .map((measure: Measure) => measure.parentId || DEFAULT_PARENT_ID)
    return parentIds && unique(parentIds).length > 1
  }

  const { measures = [] } = vseed as {
    measures: Measures
    dimensions: Dimensions
  }

  const hasMeasureGroup = measures && measures.some((measure: DimensionGroup) => measure && measure.children)

  return hasMeasureGroup
}

export const isRectungularCoordinate = (chartType: string) => {
  return (
    [
      ChartTypeEnum.Bar,
      ChartTypeEnum.BarPercent,
      ChartTypeEnum.BarParallel,
      ChartTypeEnum.Column,
      ChartTypeEnum.ColumnPercent,
      ChartTypeEnum.ColumnParallel,
      ChartTypeEnum.Line,
      ChartTypeEnum.Area,
      ChartTypeEnum.AreaPercent,
      ChartTypeEnum.DualAxis,
      ChartTypeEnum.Boxplot,
      ChartTypeEnum.DualAxis,
      ChartTypeEnum.Scatter,
      ChartTypeEnum.Heatmap,
      ChartTypeEnum.Boxplot,
    ] as string[]
  ).includes(chartType)
}

/**
 * 默认的双轴图图表类型配置
 */
export const DEFAULT_DUAL_CHART_TYPE = {
  primary: 'column',
  secondary: 'line',
}

export const isDualAxisChartType = (chartType: string | undefined) => {
  return (
    chartType &&
    ['column', 'columnParallel', 'columnPercent', 'line', 'area', 'areaPercent', 'scatter'].includes(chartType)
  )
}
