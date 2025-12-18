import type { BaseMeasure } from './baseMeasure'

export type HeatmapMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'color' | 'label' | 'tooltip'
}
