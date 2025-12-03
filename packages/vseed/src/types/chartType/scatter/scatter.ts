import type { Locale } from '../../i18n'

import type {
  AnnotationArea,
  AnnotationHorizontalLine,
  AnnotationPoint,
  AnnotationVerticalLine,
  BackgroundColor,
  Color,
  Dataset,
  Dimensions,
  Label,
  Legend,
  PointStyle,
  Theme,
  Tooltip,
  CrosshairLine,
  YLinearAxis,
  XLinearAxis,
  MeasureTree,
  ScatterMeasures,
  LinearRegressionLine,
  LowessRegressionLine,
  PolynomialRegressionLine,
  LogisticRegressionLine,
  DimensionLinkage,
} from '../../properties'

/**
 * @description 散点图，适用于展示数据的分布情况，通过点的位置表示数据的数值
 * 适用场景:
 * - 分析数据的分布特征, 如数据的中心趋势, 分布范围, 异常值等
 * @encoding
 * 散点图支持以下视觉通道:
 * `xAxis`  : x轴通道, 支持`多个指标`, 按指标值映射至x轴
 * `yAxis`  : y轴通道, 支持`多个指标`, 按指标值映射至y轴
 * `color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示
 * `label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签
 * @warning
 * 数据要求:
 * - 至少2个数值字段（度量）
 * - 第一个指标字段会放至X轴, 其余指标会进行合并, 映射至Y轴
 * - 指标名称和维度名称会合并, 作为图例项展示
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据点标记、提示信息、趋势线
 * @recommend
 * - 推荐字段配置: `2`个指标, `1`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface Scatter {
  /**
   * 散点图
   * @description 散点图，适用于展示数据的分布情况，通过点的位置表示数据的数值
   * @type {'scatter'}
   * @example 'scatter'
   */
  chartType: 'scatter'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 折线图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 散点图的第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示
   * @type {Dimensions}
   * @example [{id: "month", alias: "月份"}]
   */
  dimensions?: Dimensions

  /**
   * @description 散点图指标
   * measures可以使用2个指标组, 代表普通散点图的X轴和Y轴指标, 每个指标组内的指标会自动合并为一个指标.
   * measures可以使用1个指标组, 再嵌套2个指标组, 绘制组合散点图. 最外层的每一个组, 代表一个散点图, 它们会纵向排列.
   * @example
   * 普通散点图
   * [
   *   {
   *     id: "xAxis",
   *     alias: '主轴',
   *     children: [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}]
   *   },
   *   {
   *     id: "y",
   *     alias: '次轴',
   *     children: [{id: 'growth', alias: '增长率'}, {id: 'returnRatio', alias: '回报率'}]
   *   }
   * ]
   * 组合散点图
   * [
   *   {
   *     id: "first",
   *     alias: "第一个散点图",
   *     children: [
   *      {
   *        id: "xAxis",
   *        alias: '主轴',
   *        children: [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}]
   *      },
   *      {
   *        id: "y",
   *        alias: '次轴',
   *        children: [{id: 'growth', alias: '增长率'}, {id: 'returnRatio', alias: '回报率'}]
   *      },
   *     ]
   *   },
   *   {
   *     id: "second",
   *     alias: "第二个散点图",
   *     children: [
   *      {
   *        id: "xAxis2",
   *        alias: '主轴',
   *        children: [{id: 'profit2', alias: '利润'}, {id: 'sales2', alias: '销售额'}]
   *      },
   *      {
   *        id: "y2",
   *        alias: '次轴',
   *        children: [{id: 'growth2', alias: '增长率'}, {id: 'returnRatio2', alias: '回报率'}]
   *      },
   *     ]
   *   },
   * ]
   */
  measures?: MeasureTree

  /**
   * @description 散点图指标, 是measures的简化形式
   * 组合的散点图指标配置, 每个对象都代表一个散点图, 散点图之间纵向排列, 必须是数组.
   * 每个配置对象内, xMeasures代表所有的X轴指标, yMeasures代表所有的Y轴指标, xMeasures和yMeasures可配置为数组或一个对象
   * xMeasures 如果是多个指标, 则会自动合并, 映射至X轴
   * yMeasures 如果是多个指标, 则会自动合并, 映射至Y轴
   * @example
   * 如下示例配置了一个双轴图, 主轴有1个value指标, 次轴有1个growth指标
   * [
   *   {
   *     xMeasures:   {id: 'value', alias: '数值'}
   *     yMeasures: {id: 'growth', alias: '增长率'}
   *   }
   * ]
   * 如下示例配置了2个纵向排列的双轴图, 第一个双轴图, 主轴有1个value指标, 次轴有一个growth指标, 第二个双轴图, 主轴有2个指标: profit与sales, 次轴有一个returnRatio指标
   * [
   *   {
   *     xMeasures:  {id: 'value', alias: '数值'}
   *     yMeasures: {id: 'growth', alias: '增长率'}
   *   },
   *   {
   *     xMeasures:   [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}],
   *     yMeasures: [{id: 'returnRatio', alias: '回报率'}]
   *   }
   * ]
   */
  scatterMeasures?: ScatterMeasures

  /**
   * @description 散点图指标的大小, 用于定义散点图中数据点的大小 或 大小范围
   * - 若大小范围是一个数字, 例如10, 表示数据点的大小范围固定为10
   * - 若大小范围是一个长度为2的数组, 例如[10, 40], 表示数据点的大小范围在10到40之间
   * - 与sizeRange互斥, 优先级低于 size
   */
  size?: number | number[]

  /**
   * @description 散点图指标的大小范围, 用于定义散点图中数据点的大小范围,
   * - 若大小范围是一个长度为2的数组, 例如[10, 40], 表示数据点的大小范围在10到40之间
   * - 若大小范围是一个数字, 例如10, 表示数据点的大小范围固定为10
   * - 与sizeRange互斥, 优先级高于 size
   */
  sizeRange?: number | number[]

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
   * @description 数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YLinearAxis

  /**
   * 垂直提示线
   * @description  鼠标移动到图表上时, 显示的垂直提示线
   */
  crosshairLine?: CrosshairLine

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
   * 标注点
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * 标注垂直线
   * @description 数值标注线(包括均值线、最大值线、最小值线等)，竖直方向展示，能够设置标注线的位置, 样式等，如需绘制x轴度量均值线等数值对应的标注线请使用该配置
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * 标注水平线
   * @description 数值标注线(包括均值线、最大值线、最小值线等)，竖直方向展示，能够设置标注线的位置, 样式等，如需绘制y轴度量均值线等数值对应的标注线请使用该配置
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * 标注区域
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[]
  /**
   * 线性回归线
   * @description 线性回归线配置, 包括线性回归线的样式等.
   */
  linearRegressionLine?: LinearRegressionLine | LinearRegressionLine[]
  /**
   * 局部加权回归线配置项
   * @description 局部加权回归线配置项, 包括局部加权回归线的样式等.
   */
  lowessRegressionLine?: LowessRegressionLine | LowessRegressionLine[]
  /**
   * 多项式回归线
   * @description 多项式回归线配置, 包括多项式的阶数、回归线的样式等.
   */
  polynomialRegressionLine?: PolynomialRegressionLine | PolynomialRegressionLine[]
  /**
   * 逻辑回归线
   * @description 逻辑回归线配置, 包括逻辑回归线的样式等.
   */
  logisticRegressionLine?: LogisticRegressionLine | LogisticRegressionLine[]
  /**
   * @description 当图表开启透视功能或者指标组合的是否，是否开启维度联动功能
   * 当hover 到某个维度值时，联动高亮其他图表中相同维度值的数据
   */
  dimensionLinkage?: DimensionLinkage
  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
