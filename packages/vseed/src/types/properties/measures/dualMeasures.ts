import type { Measure } from './measures'

export type DualMeasure = Measure & {
  /**
   * @deprecated 设置该指标在双轴图中的图表类型, 仅适用于双轴图
   * - line: 折线图
   * - column: 柱状图
   * - columnParallel: 平行柱状图
   * - area: 面积图
   * - scatter: 散点图
   */
  chartType?: 'line' | 'column' | 'columnParallel' | 'area' | 'scatter'

  /**
   * @description 指标映射的通道
   * - primaryYAxis: 指标映射的主y轴
   * - secondaryYAxis: 指标映射的次y轴
   * - color: 指标映射的颜色
   * - label: 指标映射的标签
   * - tooltip: 指标映射的提示
   */
  encoding?: 'primaryYAxis' | 'secondaryYAxis' | 'color' | 'label' | 'tooltip'
}
export type DualMeasures = DualMeasure[]
