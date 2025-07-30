import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 并列柱状图类型定义
 * @description 并列柱状图，适用于多指标并行对比场景，多个柱子并列排列展示不同指标值
 * 适用场景:
 * - 同一维度下多指标并行对比
 * - 多维度数据的横向比较
 * - 指标间关联性分析
 * 数据要求:
 * - 至少1个指标字段（度量） 
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息、指标排序
 */
export interface ColumnParallel {
  /**
   * 并列柱状图
   * @description 并列柱状图，适用于多指标并行对比场景
   * @type {'columnParallel'}
   * @example 'columnParallel'
   */
  chartType: 'columnParallel'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 并列柱状图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]
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
   * @description 并列柱状图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value1', alias: '指标1'}, {id: 'value2', alias: '指标2'}]
   */
  measures: Measures
}