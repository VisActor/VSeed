import type { Dataset, Dimensions, Measures } from 'src/types'

/**
 * 透视表类型定义
 * @description 透视表，适用于多维度数据交叉分析场景，可灵活配置行、列维度和指标计算方式
 * 适用场景:
 * - 复杂多维数据统计分析
 * - 数据钻取与聚合展示
 * - 业务报表生成与数据探索
 * 数据要求:
 * - 至少1个行维度 或 1个列维度 或 1个指标
 * - 数据必须已聚合
 * - 数据可被分组
 * 默认开启的功能:
 * - 默认开启行列排序、数据筛选、聚合计算、小计/总计
 */
export interface PivotTable {
  /**
   * 透视表
   * @description 透视表，适用于多维度数据交叉分析场景
   * @type {'pivotTable'}
   * @example 'pivotTable'
   */
  chartType: 'pivotTable'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 透视表的数据最终会被转换对应的树形结构, 用户无需手动进行数据处理.
   * @type {Array<Record<string|number, any>>}
   * @example [{region:'华东', product:'A', sales:1000}, {region:'华东', product:'B', sales:1500}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 透视表的行维度和列维度，会自动对数据进行处理为树形结构, 并映射到行和列轴, 可以通过 location : "rowDimension" | "columnDimension" 来控制一维度的映射位置
   * @type {Dimensions}
   * @example [{id: 'region', alias: '地区', isRow: true}, {id: 'product', alias: '产品', isColumn: true}]
   */
  dimensions: Dimensions

  /**
   * 指标
   * @description 透视表支持多个维度指标
   * @type {Measures}
   * @example [{id: 'sales', alias: '销售额', aggregation: 'sum'}]
   */
  measures: Measures
}