import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 百分比面积图类型定义
 * @description 百分比面积图，适用于展示多类别占比随时间变化的趋势，Y轴以百分比形式展示占比关系
 * 适用场景:
 * - 时间序列的构成变化分析
 * - 多类别占比趋势对比
 * - 累积占比与单一类别占比同时展示
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、百分比标签、提示信息、占比计算
 */
export interface AreaPercent {
  /**
   * 百分比面积图
   * @description 百分比面积图，以百分比形式展示多类别占比随某个维度的变化
   * @type {'areaPercent'}
   * @example 'areaPercent'
   */
  chartType: 'areaPercent'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 百分比面积图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', category:'A', value:30}, {month:'1月', category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{ id: 'month', alias: '月份' }, { id: 'year', alias: '年份' }]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 百分比面积图的指标会自动合并为一个指标, 映射到Y轴, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures: Measures
}