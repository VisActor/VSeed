import { zLocale, type Locale } from '../../i18n'
import {
  zAnnotationArea,
  zAnnotationHorizontalLine,
  zAnnotationPoint,
  zAnnotationVerticalLine,
  zBackgroundColor,
  zBarStyle,
  zColor,
  zCrosshairRect,
  zDataset,
  zDimensions,
  zLabel,
  zLegend,
  zMeasureTree,
  zStackCornerRadius,
  zTheme,
  zTooltip,
  zXLinearAxis,
  zYBandAxis,
} from '../../properties'
import {
  type AnnotationArea,
  type AnnotationHorizontalLine,
  type AnnotationPoint,
  type AnnotationVerticalLine,
  type BackgroundColor,
  type BarStyle,
  type Color,
  type CrosshairRect,
  type Dataset,
  type Dimensions,
  type Label,
  type Legend,
  type DimensionTree,
  type StackCornerRadius,
  type Theme,
  type Tooltip,
  type XLinearAxis,
  type YBandAxis,
} from '../../properties'
import { z } from 'zod'

/**
 * 条形图类型定义
 * @description 条形图，适用于横向数据对比场景，Y轴为类目轴（分类数据），X轴为数值轴（连续数据），柱子横向排列
 * 适用场景:
 * - 数据项名称较长时
 * - 需要展示数据排名对比
 * - 展示正负双向数据
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息
 */
export interface Bar {
  /**
   * 条形图
   * @description 条形图，适用于横向数据对比场景，Y轴为类目轴（分类数据），X轴为数值轴（连续数据），柱子横向排列
   * @type {'bar'}
   * @example 'bar'
   */
  chartType: 'bar'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 条形图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{date:'2020-01-01', value:100}, {date:'2020-01-02', value:200}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: "date", alias: "日期"}, {id: "value", alias: "数值"}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {DimensionTree}
   * @example [{id: "value", alias: "数值"}]
   */
  measures?: DimensionTree

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
   * x轴
   * @description 数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XLinearAxis

  /**
   * y轴
   * @description 类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YBandAxis

  /**
   * 水平提示框
   * @description 水平提示框配置, 用于定义图表的水平提示框, 包括水平提示框的颜色、标签样式等.
   */
  crosshairRect?: CrosshairRect

  /**
   * 条形图 堆叠圆角
   * @description 条形图 堆叠圆角
   * @default 8
   */
  stackCornerRadius?: StackCornerRadius

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
   * 矩形图元样式
   * @description 条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  barStyle?: BarStyle | BarStyle[]

  /**
   * 标注点
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * 标注垂直线
   * @description 标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * 标注水平线
   * @description 标注水平线配置, 根据选择的数据, 定义图表的标注水平线, 包括标注水平线的位置, 样式等.
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * 标注区域
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[]

  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}

export const zBar = z.object({
  chartType: z.literal('bar'),
  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasureTree.optional(),
  backgroundColor: zBackgroundColor.optional(),
  color: zColor.optional(),
  label: zLabel.optional(),
  legend: zLegend.optional(),
  tooltip: zTooltip.optional(),
  xAxis: zXLinearAxis.optional(),
  yAxis: zYBandAxis.optional(),
  crosshairRect: zCrosshairRect.optional(),
  stackCornerRadius: zStackCornerRadius.optional(),
  theme: zTheme.optional(),
  barStyle: zBarStyle.optional(),
  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).optional(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).optional(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).optional(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).optional(),
  locale: zLocale.optional(),
})
