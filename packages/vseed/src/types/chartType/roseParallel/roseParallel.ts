import { type Locale } from '../../i18n'
import type { MeasureTree } from '../../properties'
import {
  type BackgroundColor,
  type Color,
  type Dataset,
  type Dimensions,
  type Label,
  type Legend,
  type Theme,
  type Tooltip,
} from '../../properties'

/**
 * @description 分组玫瑰图，适用于多维度数据对比场景，通过极坐标系下的扇形弧度和半径展示数据大小
 * 适用场景:
 * - 多维度数据的分布对比
 * - 周期性数据的强弱比较
 * - 分类数据的数值与占比同时展示
 * @encoding
 * 分组玫瑰图支持以下视觉通道:
 * `angle`  : 角度通道, 支持`多个维度`, 按维度值映射至角度轴
 * `radius` : 半径通道, 支持`多个指标`, 按指标值映射至半径轴
 * `detail` : 细分通道, 支持`多个维度`, 在同一个颜色系列下展示更细粒度的数据时使用
 * `color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示
 * `label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签
 * @warning
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 第一个维度会放至角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、极坐标系、数据标签、提示信息、数值缩放
 * @recommend
 * - 推荐字段配置: `1`个指标, `1`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface RoseParallel {
  /**
   * 分组玫瑰图
   * @description 分组玫瑰图，通过极坐标系展示多维度数据对比关系
   * @type {'roseParallel'}
   * @example 'roseParallel'
   */
  chartType: 'roseParallel'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 玫瑰图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 玫瑰图的第一个维度被映射到角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 玫瑰图的指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
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
  color?: Color

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: Omit<Label, 'labelLayout'>

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
