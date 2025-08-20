import type { Locale } from '../../i18n'
import { zLocale } from '../../i18n'
import {
  zAnnotationArea,
  zAnnotationHorizontalLine,
  zAnnotationPoint,
  zAnnotationVerticalLine,
  zAreaStyle,
  zBackgroundColor,
  zCrosshairLine,
  zDataset,
  zDimensions,
  zLabel,
  zLineStyle,
  zMeasureTree,
  zPointStyle,
  zTheme,
  zXBandAxis,
  zYLinearAxis,
} from '../../properties'
import type {
  AnnotationArea,
  AnnotationHorizontalLine,
  AnnotationPoint,
  AnnotationVerticalLine,
  AreaStyle,
  BackgroundColor,
  Dataset,
  Dimensions,
  Label,
  LineStyle,
  PointStyle,
  Theme,
  XBandAxis,
  YLinearAxis,
  CrosshairLine,
  SortAxis,
  MeasureTree,
} from '../../properties'
import { z } from 'zod'

/**
 * 区间面积图类型定义
 * @description 区间面积图与面积图的区别在于, 区间面积图的Y轴数据是一个区间, 而面积图的Y轴数据是一个数值. 区间面积图适用于展示数据的变化范围
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
export interface AreaRange {
  /**
   * 面积图
   * @description 面积图，展示数据趋势及累积关系的图表类型
   * @type {'area'}
   * @example 'area'
   */
  chartType: 'areaRange'
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
  dimensions?: Dimensions

  /**
   * 指标
   * @description 区间面积图需要2个指标, 第一个指标映射到Y轴的下边界, 第二个指标映射到Y轴的上边界, 第二个之后的指标会被忽略.
   * @type {DimensionTree}
   * @example [{id: 'value', alias: '数值'}]
   */
  measures?: MeasureTree

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: Label

  /**
   * x轴
   * @description 类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XBandAxis

  /**
   * y轴
   * @description 数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YLinearAxis

  /**
   * 垂直提示线
   * @description  鼠标移动到图表上时, 显示的垂直提示线
   */
  crosshairLine?: CrosshairLine

  /**
   * @description X轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
   * @example
   * sortAxis: {
   *   orderBy: 'profit',
   *   order: 'asc',
   * }
   * sortAxis: {
   *   customOrder:['2019', '2020', '2021']
   * }
   */
  sortAxis?: SortAxis

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
   * 点图元样式
   * @description 点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  pointStyle?: PointStyle | PointStyle[]

  /**
   * 线图元样式
   * @description 线图元样式配置, 用于定义图表的线图元样式, 包括线图元的颜色, 透明度, 曲线等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  lineStyle?: LineStyle | LineStyle[]

  /**
   * 面积图元样式
   * @description 面积图元样式配置, 用于定义图表的面积图元样式, 包括面积图元的颜色, 透明度, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  areaStyle?: AreaStyle | AreaStyle[]

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

export const zAreaRange = z.object({
  chartType: z.literal('areaRange'),
  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasureTree.optional(),
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  xAxis: zXBandAxis.optional(),
  yAxis: zYLinearAxis.optional(),
  crosshairLine: zCrosshairLine.optional(),
  theme: zTheme.optional(),
  pointStyle: z.array(zPointStyle).or(zPointStyle).optional(),
  lineStyle: z.array(zLineStyle).or(zLineStyle).optional(),
  areaStyle: z.array(zAreaStyle).or(zAreaStyle).optional(),
  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).optional(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).optional(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).optional(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).optional(),
  locale: zLocale.optional(),
})
