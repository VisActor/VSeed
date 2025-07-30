import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 面积图类型定义
 * @description 面积图, 适用于展示数据随时间变化的趋势及累积关系, 通过填充区域增强数据对比. X轴为类目轴(分类数据), Y轴为数值轴(连续数据).
 * 适用场景:
 * - 展示单一数据系列的趋势变化
 * - 强调总量随时间的累积效果
 * - 对比多个数据系列的总量差异
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度字段映射到X轴，其余维度字段会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 模块开启堆叠
 * - 默认开启图例、坐标轴、区域填充、数据标签、提示信息
 */
export interface Area {
  /**
   * 面积图
   * @description 面积图，展示数据趋势及累积关系的图表类型
   * @type {'area'}
   * @example 'area'
   */
  chartType: 'area'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 面积图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
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
   * @description 面积图的指标会自动合并为一个指标, 映射到Y轴, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值'}]
   */
  measures: Measures
}