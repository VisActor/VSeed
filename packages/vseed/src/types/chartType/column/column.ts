import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 柱状图类型定义
 * @description 柱状图，适用于纵向数据对比场景，X轴为类目轴（分类数据），Y轴为数值轴（连续数据），柱子纵向排列
 * 适用场景:
 * - 数据项名称较短时
 * - 需要直观比较不同类别的数值大小
 * - 展示时间序列数据变化趋势
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息
 */
export interface Column {
  /**
   * 柱状图
   * @description 柱状图，适用于纵向数据对比场景，X轴为类目轴（分类数据），Y轴为数值轴（连续数据），柱子纵向排列
   * @type {'column'}
   * @example 'column'
   */
  chartType: 'column'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 柱状图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:100}, {category:'B', value:200}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 柱状图的第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
   * @type {Dimensions}
   * @example [{id: "category", alias: "类别"}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 柱状图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: "value", alias: "数值"}]
   */
  measures: Measures
}