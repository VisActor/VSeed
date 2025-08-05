import type { BackgroundColor, Dataset, Dimensions, Measures } from 'src/types'

/**
 * 玫瑰图类型定义
 * @description 玫瑰图，适用于多维度数据对比场景，通过极坐标系下的扇形弧度和半径展示数据大小
 * 适用场景:
 * - 多维度数据的分布对比
 * - 周期性数据的强弱比较
 * - 分类数据的数值与占比同时展示
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 第一个维度会放至角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、极坐标系、数据标签、提示信息、数值缩放
 */
export interface Rose {
  /**
   * 玫瑰图
   * @description 玫瑰图，通过极坐标系展示多维度数据对比关系
   * @type {'rose'}
   * @example 'rose'
   */
  chartType: 'rose'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 玫瑰图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 玫瑰图的第一个维度被映射到角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 玫瑰图的指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值'}]
   */
  measures: Measures

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor
}
