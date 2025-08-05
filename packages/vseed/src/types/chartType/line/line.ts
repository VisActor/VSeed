import type { BackgroundColor, Color, Dataset, Dimensions, Label, Legend, Measures, Theme, Tooltip } from 'src/types'

/**
 * 折线图类型定义
 * @description 折线图，适用于展示数据随时间或有序类别变化的趋势，通过线段连接数据点形成趋势线
 * 适用场景:
 * - 展示时间序列数据的变化趋势
 * - 比较多个数据系列的趋势对比
 * - 分析数据的增长或下降规律
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据点标记、提示信息、趋势线
 */
export interface Line {
  /**
   * 折线图
   * @description 折线图，适用于展示数据随时间或有序类别变化的趋势
   * @type {'line'}
   * @example 'line'
   */
  chartType: 'line'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 折线图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 折线图的第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
   * @type {Dimensions}
   * @example [{id: "month", alias: "月份"}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 折线图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: Measures

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * 颜色
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.
   */
  color?: Color

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: Label

  /**
   * 图例
   * @description 图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
   */
  legend?: Legend

  /**
   * 提示信息
   * @description 提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.
   */
  tooltip?: Tooltip

  /**
   * 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置
   * @default light 默认为亮色主题
   * @description 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme
}
