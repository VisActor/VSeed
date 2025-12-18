import type { BaseMeasure } from './baseMeasure'

export type HistogramMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - value: 直方图的值通道
   * - x0: 直方图的x0通道
   * - x1: 直方图的x1通道
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'value' | 'x0' | 'x1' | 'color' | 'label' | 'tooltip'
}
