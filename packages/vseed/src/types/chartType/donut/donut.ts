import { type Locale } from '../../i18n'
import type {
  BackgroundColor,
  Color,
  Dataset,
  Dimensions,
  Encoding,
  Label,
  Legend,
  MeasureTree,
  Theme,
  Tooltip,
} from '../../properties'

/**
 * @description 环形图，适用于展示单一维度数据的占比关系，中心留有空白区域可展示汇总信息
 * 适用场景:
 * - 需要同时展示整体数据和各部分占比
 * - 强调数据的整体与部分关系
 * - 中心区域需要展示关键指标或标题
 * @encoding
 * 维度未包含任何`encoding`, 则使用默认映射规则:
 * 1. color: 所有维度, 合并映射至颜色通道, 作为图例展示
 * 2. detail: 所有维度, 映射至Detail通道
 * 指标未包含任何`encoding`, 则使用默认映射规则:
 * 1. angle: 全部指标映射至angle轴
 * 2. tooltip: 全部指标映射至Tooltip
 *
 * 维度映射规则:
 * 2. 用户指定的`color`维度映射至颜色通道, 支持多个维度; 若未指定, 则默认将指标名称映射至颜色通道, 作为图例展示
 * 3. 用户指定的`detail`维度映射至Detail通道, 支持多个维度; 若未指定, 则无detail
 * 指标映射规则:
 * 1. 指标未配置`encoding`, 则默认映射至angle轴;
 * 2. 用户指定的`angle`指标映射至angle轴, 支持多个指标;
 * 3. 用户指定的`color`指标映射至color通道, 支持多个指标;
 * 3. 所有指标均映射到Tooltip
 * @warning
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 所有维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、数据标签、提示信息、占比计算、中心文本
 * @recommend
 * - 推荐字段配置: `1`个指标, `2`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface Donut {
  /**
   * 环形图
   * @description 环形图，中心留有空白区域的饼图变体
   * @type {'donut'}
   * @example 'donut'
   */
  chartType: 'donut'

  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 环形图的数据最终会被转换为1个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * @description 编码配置, 环形图的视觉通道, 包括: color通道, detail通道, label通道, tooltip通道
   * - color: 颜色映射通道, 支持放入多个维度 或 1个 指标
   * - detail: 细分映射通道, 支持放入多个维度
   * - tooltip: 提示映射通道, 支持放入多个维度 和 多个指标
   * - label: 标签映射通道, 支持放入 多个维度 或 多个指标
   * 
   * @tip 特殊的:
   * - angle: measures会直接映射到角度通道
   */
  encoding?: Pick<Encoding, 'color' | 'detail' | 'label' | 'tooltip'>

  /**
   * 维度
   * @description 环形图的所有维度会与指标名称(存在多个指标时)合并成1个维度, 映射到饼图的角度, 并作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 环形图的所有指标会自动合并为一个指标, 映射到饼图的半径, 存在多个指标时, 指标名称会与其余维度合并, 并作为图例项展示.
   * @type {DimensionTree}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
   */
  measures?: MeasureTree

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

  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
