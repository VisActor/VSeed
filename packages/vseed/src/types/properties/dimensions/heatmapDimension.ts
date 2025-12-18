import type { BaseDimension } from './baseDimension'

export type HeatmapDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - xAxis: 支持将多个维度映射到x轴
   * - yAxis: 支持将多个维度映射到y轴
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'xAxis' | 'yAxis' | 'tooltip' | 'label' | 'row' | 'column'
}
