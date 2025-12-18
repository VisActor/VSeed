import type { BaseMeasure } from './baseMeasure'

export type BoxPlotMeasure = BaseMeasure & {
  /**
   * @description 指标映射的通道
   * - value: 离散的值对应的指标，用于计算统计值展示箱线图
   * - q1: 统计值 25 分位数对应的指标映射
   * - q3: 统计值 75 分位数对应的指标映射
   * - min: 盒须最小值的指标映射
   * - max: 盒须最大值的指标映射
   * - meadian: 统计值中位数的指标映射
   * - outliers: 异常值的指标映射
   * - detail: 指标映射的详情
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'value' | 'q1' | 'q3' | 'min' | 'max' | 'median' | 'outliers' | 'color' | 'label' | 'tooltip'
}
