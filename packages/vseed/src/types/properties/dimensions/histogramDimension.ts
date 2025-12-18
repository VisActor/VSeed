import type { BaseDimension } from './baseDimension'

export type HistogramDimension = BaseDimension & {
  /**
   * @description 维度映射的通道
   * - color: 支持将多个维度映射到颜色通道
   * - detail: 支持将多个维度映射到详情通道
   * - tooltip: 支持将多个维度映射到提示通道
   * - label: 支持将多个维度映射到标签通道
   * - row: 支持将多个维度映射到行通道
   * - column: 支持将多个维度映射到列通道
   */
  encoding?: 'tooltip' | 'label' | 'row' | 'column'
}
