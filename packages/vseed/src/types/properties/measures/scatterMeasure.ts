import type { BaseMeasure } from './baseMeasure'

export type ScatterMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - xAxis: 指标映射的x轴
   * - yAxis: 指标映射的y轴
   * - size: 指标映射的大小
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'xAxis' | 'yAxis' | 'size' | 'color' | 'label' | 'tooltip'
}
