import type { BaseMeasure } from './baseMeasure'

export type FunnelMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - size: 指标映射的大小
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'size' | 'color' | 'label' | 'tooltip'
}
