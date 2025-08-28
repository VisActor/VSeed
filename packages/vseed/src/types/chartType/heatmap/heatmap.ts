import { type Locale } from '../../i18n'
import type { ColorLegend, LinearColor, MeasureTree } from '../../properties'
import {
  type BackgroundColor,
  type Dataset,
  type Dimensions,
  type Label,
  type Theme,
  type Tooltip,
} from '../../properties'

/**
 * 热力图类型定义
 * @description 热力图，通过二维矩阵的颜色深浅展示数据的分布和强弱关系
 * 适用场景:
 * - 大规模二维数据的密度和强度展示
 * - 分类与数值的关联分析
 * - 时间序列与类别的交叉对比
 * 数据要求:
 * - 至少2个维度字段，用于确定热力图的行和列
 * - 至少1个数值字段（度量），用于映射颜色深浅
 * - 支持多个指标时，通常选择一个指标进行颜色映射
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息、数值缩放
 */
export interface Heatmap {
  /**
   * 热力图
   * @description 热力图，通过二维矩阵的颜色深浅展示数据的分布和强弱关系
   * @type {'heatmap'}
   * @example 'heatmap'
   */
  chartType: 'heatmap'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 热力图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 热力图的第一个维度被映射到角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 热力图的指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {MeasureTree}
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
   * 颜色
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.
   */
  color?: LinearColor

  /**
   * @description 热力图标签配置, 用于定义图表的数据标签, 自动开启标签反色, 确保标签可读性.
   */
  label?: Label

  /**
   * 图例
   * @description 热力图的颜色图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
   */
  legend?: ColorLegend

  /**
   * 提示信息
   * @description 热力图的提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.
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
