import type { BackgroundColor, Dataset, Dimensions, Measures } from 'src/types'

/**
 * 百分比柱状图类型定义
 * @description 百分比柱状图，适用于展示各类别占比关系的场景，Y轴以百分比形式展示数据占比
 * 适用场景:
 * - 不同类别数据的占比对比
 * - 多维度数据的构成分析
 * - 时间序列的占比变化趋势
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、百分比标签、提示信息、占比计算
 */
export interface ColumnPercent {
  /**
   * 百分比柱状图
   * @description 百分比柱状图，以百分比形式展示各类别数据占比关系
   * @type {'columnPercent'}
   * @example 'columnPercent'
   */
  chartType: 'columnPercent'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 百分比柱状图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 百分比柱状图指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures: Measures

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor
}
