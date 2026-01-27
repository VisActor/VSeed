import { type Locale } from '../../i18n'
import type { AreaStyle, LineStyle, PointStyle, RadarDimension, RadarMeasure } from '../../properties'
import {
  type BackgroundColor,
  type Color,
  type Dataset,
  type Label,
  type Legend,
  type Theme,
  type Tooltip,
  type Page,
} from '../../properties'
import type { Brush } from '../../properties'

/**
 * @description 雷达图，适用于多维度数据的对比分析，通过多轴坐标系展示各维度的数值分布
 * 适用场景:
 * - 多维度数据的综合表现对比
 * - 多个对象在多个指标上的性能评估
 * - 分类数据的多维度特征展示
 * @encoding
 * 雷达图支持以下视觉通道:
 * `angle`  : 角度通道, 支持`多个维度`, 按维度值映射至角度轴
 * `radius` : 半径通道, 支持`多个指标`, 按指标值映射至半径轴
 * `color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示
 * `label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签
 * @warning
 * 数据要求:
 * - 至少1个数值字段（度量）
 * - 第一个维度作为雷达图的各个维度轴，其他维度作为不同的系列进行对比
 * - 支持多个指标分别作为不同的系列展示
 * 默认开启的功能:
 * - 默认开启图例、雷达坐标系、数据标签、提示信息、数值缩放
 * @recommend
 * - 推荐字段配置: `1`个指标, `1`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface Radar {
  /**
   * 雷达图
   * @description 雷达图，通过多轴坐标系展示多维度数据对比关系
   * @type {'radar'}
   * @example 'radar'
   */
  chartType: 'radar'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 玫瑰图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 雷达图的第一个维度被映射到角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: RadarDimension[]

  /**
   * 指标
   * @description 雷达图的指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @example [{id: 'value', alias: '数值'}]
   */
  measures?: RadarMeasure[]

  /**
   * @description 分页配置, 用于指定分页的字段名, 必须是维度
   */
  page?: Page

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
   * 框选
   * @description 框选配置，用于开启/关闭 brush 框选能力
   */
  brush?: Brush

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
   * @description 点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  pointStyle?: PointStyle | PointStyle[]

  /**
   * @description 线图元样式配置, 用于定义图表的线图元样式, 包括线图元的颜色, 透明度, 曲线等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  lineStyle?: LineStyle | LineStyle[]

  /**
   * @description 面积图元样式配置, 用于定义图表的面积图元样式, 包括面积图元的颜色, 透明度, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  areaStyle?: AreaStyle | AreaStyle[]

  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
