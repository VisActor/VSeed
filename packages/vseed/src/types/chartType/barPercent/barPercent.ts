import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 百分比条形图类型定义
 * @description 百分比条形图，适用于横向展示各类别占比关系的场景，X轴以百分比形式展示数据占比
 * 适用场景:
 * - 类别名称较长时的占比对比
 * - 多维度数据的横向构成分析
 * - 排名与占比同时展示的场景
 * 数据要求:
 * - 至少1个维度字段和1个度量字段
 * - 所有类别占比之和为100%
 * - 支持多系列堆叠展示占比关系
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、百分比标签、提示信息、占比计算
 */
export interface BarPercent {
  /**
   * 百分比条形图
   * @description 百分比条形图，以横向百分比形式展示各类别数据占比关系
   * @type {'barPercent'}
   * @example 'barPercent'
   */
  chartType: 'barPercent'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 百分比条形图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures: Measures
}