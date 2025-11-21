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
  YLinearAxis,
  MeasureTree,
  XLinearAxis,
  KdeRegressionLine,
  EcdfRegressionLine,
  DimensionLinkage,
} from '../../properties'

/**
 * @description 直方图，适用于展示数据分布情况的场景，X轴为数值轴（连续数据），Y轴为数值轴（连续数据），柱子纵向排列
 * 适用场景:
 * - 展示数据的分布情况，如频率分布、概率分布等
 * - 分析数据的集中趋势和离散程度
 * - 识别数据中的异常值和模式
 * @encoding
 * 直方图支持以下视觉通道:
 * `xAxis`  : x轴通道, 支持`一个维度`, 按维度值分箱计算后显示到x轴
 */
export interface Histogram {
  /**
   * @description 直方图，适用于展示数据分布情况
   */
  chartType: 'histogram'
  /**
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 柱状图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:100}, {category:'B', value:200}]
   */
  dataset: Dataset

  /**
   * @description 直方图通常不需要维度
   * @type {Dimensions}
   * @example [{id: "category", alias: "类别"}]
   */
  dimensions?: Dimensions

  /**
   * @description 直方图仅支持一个维度，并且数据为离散数据
   * @type {MeasureTree}
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
   * @description x轴, 数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XLinearAxis

  /**
   * @description y轴, 数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YLinearAxis

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
   * @description 直方图分箱数量, 用于定义直方图的分箱数量
   */
  binCount?: number

  /**
   * @description 直方图分箱步长, 用于定义直方图的分箱步长
   */
  binStep?: number
  /**
   * @description 直方图分箱值类型, 用于定义直方图的分箱值类型, 默认为'count'
   * @default 'count'
   */
  binValueType?: 'count' | 'percentage'

  /**
   * @description 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置, 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @default light 默认为亮色主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

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
   * @description 核密度回归线配置, 用于展示数据的趋势和分布情况
   */
  kdeRegressionLine?: KdeRegressionLine | KdeRegressionLine[]
  /**
   * @description 经验累积分布函数回归线配置, 用于展示数据的累积分布情况
   */
  ecdfRegressionLine?: EcdfRegressionLine | EcdfRegressionLine[]
  /**
   * 当图表开启透视功能或者指标组合的是否，是否开启维度联动功能
   * 当hover 到某个维度值时，联动高亮其他图表中相同维度值的数据
   */
  dimensionLinkage?: DimensionLinkage
  /**
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
