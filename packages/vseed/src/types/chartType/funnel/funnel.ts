import { z } from 'zod'
import type { Locale } from '../../i18n'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColor,
  zDataset,
  zDimensions,
  zLabel,
  zLegend,
  zMeasures,
  zTheme,
  zTooltip,
} from '../../properties'
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
 * 漏斗图
 * @description 漏斗图，用于展示单一维度数据的占比关系
 * 适用场景:
 * 漏斗图适用场景:
 * - 适合用来分析具有多个连续、规范化步骤的流程，并清晰地展示在每个环节的数据流失或转化情况
 * 数据要求:
 * - 至少1个数值字段（指标）
 * - 所有维度会与指标名称(存在多个指标时)合并成一个维度, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、数据标签、提示信息、占比计算
 */
export interface Funnel {
  /**
   * 漏斗图
   * @description 漏斗图，展示单一维度数据的占比关系
   * @type {'funnel'}
   * @example 'funnel'
   */
  chartType: 'funnel'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 饼图的数据最终会被转换为1个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value:30}, {category:'B', value:70}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 漏斗图的所有维度会与指标名称(存在多个指标时)合并成一个维度,并作为图例项展示
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 漏斗图的所有指标会自动合并为一个指标, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value', alias: '数值占比', format: 'percent'}]
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

  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}

export const zFunnel = z.object({
  chartType: z.literal('funnel'),
  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasures.optional(),
  backgroundColor: zBackgroundColor.optional(),
  color: zColor.optional(),
  label: zLabel.optional(),
  legend: zLegend.optional(),
  tooltip: zTooltip.optional(),
  theme: zTheme.optional(),
  locale: zLocale.optional(),
})
