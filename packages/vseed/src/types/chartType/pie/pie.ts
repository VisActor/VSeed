import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 饼图类型定义
 * @description 饼图，适用于展示单一维度数据的占比关系，通过扇形面积大小表示各类别占比
 * 适用场景:
 * - 展示分类数据的占比分布
 * - 强调数据的整体与部分关系
 * - 类别数量较少（建议不超过6个）的占比分析
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 所有维度会与指标名称(存在多个指标时)合并成一个维度, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、数据标签、提示信息、占比计算
 */
export interface Pie {
  /**
   * 饼图
   * @description 饼图，展示单一维度数据的占比关系
   * @type {'pie'}
   * @example 'pie'
   */
  chartType: 'pie'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 饼图的数据最终会被转换为1个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 饼图的所有维度会与指标名称(存在多个指标时)合并成一个维度, 映射到角度, 并作为图例项展示
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 饼图的所有指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures: Measures
}