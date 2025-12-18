import type { BaseMeasure } from './baseMeasure'

export type RadarMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - radius: 指标映射的半径
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'radius' | 'color' | 'label' | 'tooltip'
}

export type RoseMeasure = RadarMeasure
export type RoseParallelMeasure = RadarMeasure
