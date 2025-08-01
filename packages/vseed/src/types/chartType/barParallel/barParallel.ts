import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 并列条形图类型定义
 * @description 并列条形图，适用于多指标横向并行对比场景，多个条形平行排列展示不同指标值
 * 适用场景:
 * - 类别名称较长时的多指标对比
 * - 排名与数值同时展示的横向比较
 * - 多维度数据的并列分析
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息
 */
export interface BarParallel {
  /**
   * 并列条形图
   * @description 并列条形图，适用于多指标横向并行对比场景
   * @type {'barParallel'}
   * @example 'barParallel'
   */
  chartType: 'barParallel'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 并列条形图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 并列条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value1', alias: '指标1'}, {id: 'value2', alias: '指标2'}]
   */
  measures: Measures
}