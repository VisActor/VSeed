import type { Locale } from '../../i18n'
import type {
  AnnotationArea,
  AnnotationHorizontalLine,
  AnnotationPoint,
  AnnotationVerticalLine,
  BackgroundColor,
  BarStyle,
  Color,
  CrosshairRect,
  Dataset,
  Dimensions,
  Label,
  Legend,
  StackCornerRadius,
  Theme,
  Tooltip,
  XBandAxis,
  YLinearAxis,
  MeasureTree,
  Sort,
  SortLegend,
  Encoding,
} from '../../properties'

/**
 * @description 柱状图，适用于纵向数据对比场景，X轴为类目轴（分类数据），Y轴为数值轴（连续数据），柱子纵向排列
 * 适用场景:
 * - 数据项名称较短时
 * - 需要直观比较不同类别的数值大小
 * - 展示时间序列数据变化趋势
 * @info
 * 维度未包含任何encoding, 则使用默认映射规则:
 * 1. x: 第一个维度映射至X轴
 * 2. color: 非X轴所有维度与指标名称, 合并映射至颜色通道, 作为图例展示
 * 3. detail: 其余所有维度映射至Detail通道
 * 指标未包含任何encoding, 则使用默认映射规则:
 * 1. y: 全部指标映射至Y轴
 * 2. tooltip: 全部指标映射至Tooltip
 *
 * 维度映射规则:
 * 1. 用户指定的xAxis维度映射至X轴, 支持多个维度; 若未指定, 则默认映射第一个维度
 * 2. 用户指定的color维度映射至颜色通道, 支持多个维度; 若未指定, 则默认映射指标名称
 * 3. 用户指定的detail维度映射至Detail通道, 支持多个维度; 若未指定, 则无detail
 * 指标映射规则:
 * 1. 指标未配置encoding, 则默认映射至Y轴;
 * 2. 用户指定的yAxis指标映射至Y轴, 支持多个指标;
 * 3. 所有指标均映射到Tooltip
 * @warning
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息
 * @recommend
 * - 推荐字段配置: `1`个指标, `2`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface Column {
  /**
   * @description 柱状图，适用于纵向数据对比场景，X轴为类目轴（分类数据），Y轴为数值轴（连续数据），柱子纵向排列
   * @type {'column'}
   * @example 'column'
   */
  chartType: 'column'
  
  /**
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 柱状图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:100}, {category:'B', value:200}]
   */
  dataset: Dataset

  /**
   * @description 编码配置, 堆叠柱状图的视觉通道, 包括: x通道, color通道, detail通道, label通道, tooltip通道
   * - x: 映射到X轴的字段, 支持放入多个维度
   * - detail: 细分映射通道, 支持放入多个维度
   * - tooltip: 提示映射通道, 支持放入多个维度 和 多个指标
   * - color: 颜色映射通道, 支持放入多个维度 或 1个 指标
   * - label: 标签映射通道, 支持放入 多个维度 或 多个指标
   * 
   * @tip 特殊的:
   * - y: measures会直接映射到Y轴通道
   */
  encoding?: Pick<Encoding, 'x' | 'color' | 'detail' | 'label' | 'tooltip'>

  /**
   * @description 柱状图的第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
   * @type {Dimensions}
   * @example [{id: "category", alias: "类别"}]
   */
  dimensions?: Dimensions

  /**
   * @description 柱状图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {DimensionTree}
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: MeasureTree

  /**
   * @description 图表的背景颜色, 背景颜色可以是颜色字符串, 默认为透明背景, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.
   */
  color?: Color

  /**
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: Label

  /**
   * @description 图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
   */
  legend?: Legend

  /**
   * @description 提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.
   */
  tooltip?: Tooltip

  /**
   * @description x轴, 类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XBandAxis

  /**
   * @description y轴, 数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YLinearAxis

  /**
   * @description X轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
   * @example
   * sort: {
   *   orderBy: 'profit',
   *   order: 'asc',
   * }
   * sort: {
   *   customOrder:['2019', '2020', '2021']
   * }
   */
  sort?: Sort
  /**
   * @description 图例排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
   * @example
   * sortLegend: {
   *   orderBy: 'profit',
   *   order: 'asc',
   * }
   * sortLegend: {
   *   customOrder:['2019', '2020', '2021']
   * }
   */
  sortLegend?: SortLegend

  /**
   * @description 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @default light 默认为亮色主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

  /**
   * @description 垂直提示框配置, 用于定义图表的垂直提示框, 包括垂直提示框的颜色、标签样式等.
   */
  crosshairRect?: CrosshairRect

  /**
   * @description 柱状图 堆叠圆角
   * @default 8
   */
  stackCornerRadius?: StackCornerRadius

  /**
   * @description 矩形图元样式, 柱状图样式配置, 用于定义图表的柱状图样式, 包括柱状图的颜色, 边框, 圆角等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  barStyle?: BarStyle | BarStyle[]

  /**
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * @description 标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * @description 标注水平线配置, 根据选择的数据, 定义图表的标注水平线, 包括标注水平线的位置, 样式等.
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[]

  /**
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
