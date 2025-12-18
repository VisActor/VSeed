import type { BaseMeasure } from './baseMeasure'

export type BarMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - xAxis: 指标映射的x轴
   * - detail: 指标映射的详情
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'xAxis' | 'detail' | 'color' | 'label' | 'tooltip'
}

export type BarParallelMeasure = BarMeasure
export type BarPercentMeasure = BarMeasure
