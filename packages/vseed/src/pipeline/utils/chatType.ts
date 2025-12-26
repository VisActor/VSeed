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

  if (vseed.chartType === ChartTypeEnum.Scatter) {
    const xCount = measures.filter((m: Measure) => m.encoding === 'xAxis').length
    const yCount = measures.filter((m: Measure) => m.encoding === 'yAxis').length
    const otherCount = measures.filter(
      (m: Measure) =>
        !['size', 'xAxis', 'yAxis'].includes(m.encoding as string) &&
        !isCommonMeasureEncoding(m.encoding as MeasureEncoding),
    ).length

    /**
     * Scatter "matrix" detection logic
     *
     * xCount:    number of measures explicitly encoded on the x-axis
     * yCount:    number of measures explicitly encoded on the y-axis
     * otherCount: measures that are not size/xAxis/yAxis and are not common encodings
     *
     * When there is at least one explicit x-axis measure (xCount > 0):
     * - All x-encoded measures are counted as X.
     * - Remaining measures (y-encoded + "other") are treated as Y variants.
     *
     * When there is no explicit x-axis measure (xCount === 0):
     * - If there is at least one "other" measure, we treat exactly one of them as the X measure
     *   (so finalXCount = 1), and the remaining "other" measures contribute to Y alongside
     *   the explicit y-encoded measures.
     * - Since we conceptually "promote" one of the other measures to X, only (otherCount - 1)
     *   are left to be counted towards Y. Math.max(..., 0) protects against negative values
     *   when otherCount is 0.
     */
    let finalXCount: number
    let finalYCount: number

    if (xCount > 0) {
      // Explicit x-axis measures exist: X is fixed, Y aggregates y-encoded + other measures.
      finalXCount = xCount
      finalYCount = yCount + otherCount
    } else {
      // No explicit x-axis measure:
      // - If there are "other" measures, treat one as X.
      // - Remaining "other" measures contribute to Y, together with any y-encoded measures.
      finalXCount = otherCount > 0 ? 1 : 0
      finalYCount = yCount + Math.max(otherCount - 1, 0)
    }
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
      ?.filter((m: Measure) => isPositionMeasure(m, vseed.chartType))
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
