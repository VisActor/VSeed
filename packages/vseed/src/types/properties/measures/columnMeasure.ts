import type { BaseMeasure } from './baseMeasure'

export type ColumnMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - yAxis: 指标映射的y轴
   * - detail: 指标映射的详情
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'yAxis' | 'detail' | 'color' | 'label' | 'tooltip'
}

export type ColumnParallelMeasure = ColumnMeasure
export type ColumnPercentMeasure = ColumnMeasure
