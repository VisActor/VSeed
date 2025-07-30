import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 环形图类型定义
 * @description 环形图，适用于展示单一维度数据的占比关系，中心留有空白区域可展示汇总信息
 * 适用场景:
 * - 需要同时展示整体数据和各部分占比
 * - 强调数据的整体与部分关系
 * - 中心区域需要展示关键指标或标题
 * 数据要求:
 * - 至少1个指标字段（度量） 
 * - 所有维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、数据标签、提示信息、占比计算、中心文本
 */
export interface Donut {
  /**
   * 环形图
   * @description 环形图，中心留有空白区域的饼图变体
   * @type {'donut'}
   * @example 'donut'
   */
  chartType: 'donut'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 环形图的数据最终会被转换为1个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 环形图的所有维度会与指标名称(存在多个指标时)合并成1个维度, 映射到饼图的角度, 并作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 环形图的所有指标会自动合并为一个指标, 映射到饼图的半径, 存在多个指标时, 指标名称会与其余维度合并, 并作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures: Measures
}