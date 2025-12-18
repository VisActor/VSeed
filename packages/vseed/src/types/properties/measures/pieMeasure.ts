import type { BaseMeasure } from './baseMeasure'

export type PieMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - angle: 指标映射的角度
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'angle' | 'color' | 'label' | 'tooltip'
}

export type DonutMeasure = PieMeasure
