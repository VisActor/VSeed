import type {
  BackgroundColor,
  Color,
  Dataset,
  Dimensions,
  Label,
  Legend,
  Measures,
  Theme,
  Tooltip,
} from '../../properties'

/**
 * 双轴图类型定义
 * @description 双轴图，适用于展示两个不同量级或不同单位指标的对比关系，包含主坐标轴和次坐标轴
 * 适用场景:
 * - 不同量级指标的对比分析
 * - 相关性指标的趋势比较
 * - 需要同时展示数值和增长率等复合指标
 * - 支持不同类型图表组合（如折线图+柱状图/ 折线图+面积图/ 面积图+柱状图）
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 支持指标组, 第一组指标会放置(主轴)左轴, 第二组指标会放置(次轴)右轴
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 两组指标字段可分别映射到左右两个Y轴, 一个指标组内的所有会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启坐标轴、图例、数据标签、提示信息
 */
export interface DualAxis {
  /**
   * 双轴图
   * @description 双轴图，展示两个不同量级指标对比关系的复合图表
   * @type {'dualAxis'}
   * @example 'dualAxis'
   */
  chartType: 'dualAxis'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 双轴图的数据最终会被转换为2个维度, 1或2个指标(取决于用户是否配置了指标组).
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100, growth:0.2}, {month:'2月', value:150, growth:0.5}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'month', alias: '月份'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 双轴图如果有2组指标组, 则每个组内的所有指标分别自动合并为一个指标, 分别映射到双轴图的左右轴, 如果指标不成组, 则会当作一组指标处理.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值', axis: 'left'}, {id: 'growth', alias: '增长率', axis: 'right', format: 'percent'}]
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
