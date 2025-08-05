import type { BackgroundColor, Dataset, Dimensions, Measures } from 'src/types'

/**
 * 条形图类型定义
 * @description 条形图，适用于横向数据对比场景，Y轴为类目轴（分类数据），X轴为数值轴（连续数据），柱子横向排列
 * 适用场景:
 * - 数据项名称较长时
 * - 需要展示数据排名对比
 * - 展示正负双向数据
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息
 */
export interface Bar {
  /**
   * 条形图
   * @description 条形图，适用于横向数据对比场景，Y轴为类目轴（分类数据），X轴为数值轴（连续数据），柱子横向排列
   * @type {'bar'}
   * @example 'bar'
   */
  chartType: 'bar'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 条形图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{date:'2020-01-01', value:100}, {date:'2020-01-02', value:200}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: "date", alias: "日期"}, {id: "value", alias: "数值"}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: "value", alias: "数值"}]
   */
  measures: Measures

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor
}
