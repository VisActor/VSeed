import type { DimensionEncoding } from '../encoding'

export type BaseDimension = {
  /**
   * 维度对应的字段id
   */
  id: string
  /**
   * 维度别名
   */
  alias?: string
}

/**
 * @description 维度
 */
export type Dimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - xAxis: 支持将多个维度映射到x轴, 支持柱状图、折线图、面积图等
   * - yAxis: 支持将多个维度映射到y轴, 支持柱状图、折线图、面积图等
   * - angle: 支持将多个维度映射到角度通道, 支持玫瑰图、雷达图等
   * - color: 支持将多个维度映射到颜色通道, 支持所有图表类型
   * - detail: 支持将多个维度映射到详情通道, 支持所有图表类型
   * - tooltip: 支持将多个维度映射到提示通道, 支持所有图表类型
   * - label: 支持将多个维度映射到标签通道, 支持所有图表类型
   * - row: 支持将多个维度映射到行通道, 支持所有图表类型
   * - column: 支持将多个维度映射到列通道, 支持所有图表类型
   */
  encoding?: DimensionEncoding
}

export type ColumnDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - xAxis: 支持将多个维度映射到x轴
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'xAxis' | 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column'
}

export type BarDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - yAxis: 支持将多个维度映射到y轴
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'yAxis' | 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column'
}

export type LineDimension = ColumnDimension
export type AreaDimension = ColumnDimension
export type ColumnParallelDimension = ColumnDimension
export type ColumnPercentDimension = ColumnDimension
export type BarParallelDimension = BarDimension
export type BarPercentDimension = BarDimension
export type DualAxisDimension = ColumnDimension

export type RadarDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - angle: 支持将多个维度映射到角度通道
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'angle' | 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column'
}

export type RoseDimension = RadarDimension
export type RoseParallelDimension = RadarDimension

export type PieDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column'
}

export type DonutDimension = PieDimension
export type FunnelDimension = PieDimension

export type HeatmapDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - xAxis: 支持将多个维度映射到x轴
   * - yAxis: 支持将多个维度映射到y轴
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'xAxis' | 'yAxis' | 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column'
}

export type ScatterDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'color' | 'detail' | 'tooltip' | 'label' | 'row' | 'column'
}

export type HistogramDimension = ScatterDimension

export type BoxPlotDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - xAxis: 支持将多个维度映射到x轴
   * - color: 支持将多个维度映射到颜色通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'xAxis' | 'color' | 'tooltip' | 'label' | 'row' | 'column'
}

export type TableDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'row' | 'column'
}

/**
 * @description 维度组
 */
export type DimensionGroup = {
  id: string
  alias?: string
  children?: (TableDimension | DimensionGroup)[]
}

export type Dimensions = Dimension[]

export type DimensionTree = (TableDimension | DimensionGroup)[]
