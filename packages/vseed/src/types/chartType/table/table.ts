import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 表格类型定义
 * @description 表格，适用于详细数据展示场景，行列分明，便于查看具体数值
 * 适用场景:
 * - 需要展示详细数据明细
 * - 数据项需要精确比对
 * - 展示多维度数据属性
 * 数据要求:
 * - 至少1个维度字段
 * - 至少1个度量字段
 * - 维度字段会作为表格的列标题
 * 默认开启的功能:
 * - 默认开启排序、筛选、分页功能
 */
export interface Table {
  /**
   * 表格
   * @description 标准表格组件，用于展示详细数据
   * @type {'table'}
   * @example 'table'
   */
  chartType: 'table'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, 一个字段对应一列, 一个记录对应一行
   * @type {Array<Record<string|number, any>>}
   * @example [{id: 1, name: "A", value: 100}, {id: 2, name: "B", value: 200}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 表格的每个维度会对应一列
   * @type {Dimensions}
   * @example [{id: "name", alias: "名称"}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 表格的每个指标会对应一行, 并且天生支持指标组合.
   * @type {Measures}
   * @example [{id: "value", alias: "数值"}]
   */
  measures: Measures
}