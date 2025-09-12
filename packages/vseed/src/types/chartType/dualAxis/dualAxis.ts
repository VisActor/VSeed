import type { Locale } from '../../i18n'
import type {
  AnnotationArea,
  AnnotationHorizontalLine,
  AnnotationPoint,
  AnnotationVerticalLine,
  AreaStyle,
  BackgroundColor,
  BarStyle,
  Color,
  CrosshairRect,
  Dataset,
  Dimensions,
  DualChartType,
  DualMeasures,
  Encoding,
  Label,
  Legend,
  LineStyle,
  MeasureTree,
  PointStyle,
  Sort,
  SortLegend,
  Theme,
  Tooltip,
  YLinearAxis,
} from '../../properties'

/**
 * @description 双轴图，适用于展示两个不同量级或不同单位指标的对比关系，包含主坐标轴和次坐标轴
 * 适用场景:
 * - 不同量级指标的对比分析
 * - 相关性指标的趋势比较
 * - 需要同时展示数值和增长率等复合指标
 * - 支持不同类型图表组合（如折线图+柱状图/ 折线图+面积图/ 面积图+柱状图）
 * @encoding
 * 维度未包含任何`encoding`, 则使用默认映射规则:
 * 1. x: 第一个维度映射至X轴
 * 2. color: 非`X`轴所有维度与指标名称, 合并映射至颜色通道, 作为图例展示
 * 3. detail: 非`X`轴所有维度与指标名称, 映射至Detail通道
 * 指标未包含任何`encoding`, 则使用默认映射规则:
 * 1. y: 第一个指标映射至主Y轴, 其余指标映射至次Y轴
 * 2. tooltip: 全部指标映射至Tooltip
 *
 * 维度映射规则:
 * 1. 用户指定的`xAxis`维度映射至X轴, 支持多个维度; 若未指定, 则默认将第一个维度映射至X轴
 * 2. 用户指定的`color`维度映射至颜色通道, 支持多个维度; 若未指定, 则默认将指标名称映射至颜色通道, 作为图例展示
 * 3. 用户指定的`detail`维度映射至Detail通道, 支持多个维度; 若未指定, 则默认将指标名称映射至Detail通道
 * 指标映射规则:
 * 1. 指标未配置encoding, 则第一个指标默认映射至Y轴, 其余指标默认映射至次Y轴
 * 2. 用户指定的yAxis指标映射至主Y轴或次Y轴, 支持多个指标;
 * 3. 所有指标均映射到Tooltip
 * @warning
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 支持指标组, 第一组指标会放置(主轴)左轴, 第二组指标会放置(次轴)右轴
 * - 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 两组指标字段可分别映射到左右两个Y轴, 一个指标组内的所有会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启坐标轴、图例、数据标签、提示信息
 * @recommend
 * - 推荐字段配置: `2`个指标, `2`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 */
export interface DualAxis {
  /**
   * @description 双轴图，展示两个不同量级指标对比关系的复合图表
   * @example 'dualAxis'
   */
  chartType: 'dualAxis'

  /**
   * @description 数据集, 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 双轴图的数据最终会被转换为2个维度, 1或2个指标(取决于用户是否配置了指标组).
   * @example [{month:'1月', value:100, growth:0.2}, {month:'2月', value:150, growth:0.5}]
   */
  dataset: Dataset

  /**
   * @description 编码配置, 双轴图的视觉通道, 包括: x通道, color通道, detail通道, label通道, tooltip通道
   * - detail: 细分映射通道, 支持放入多个维度
   * - tooltip: 提示映射通道, 支持放入多个维度 和 多个指标
   * - color: 颜色映射通道, 支持放入多个维度 或 1个 指标
   * - label: 标签映射通道, 支持放入 多个维度 或 多个指标
   * 
   * @tip 特殊的:
   * - primaryY: measures会直接映射到主Y轴通道
   * - secondaryY: measures会直接映射到次Y轴通道
   */
  encoding?: Pick<Encoding, 'x' | 'color' | 'detail' | 'label' | 'tooltip'>

  /**
   * @description 维度, 第一个维度会放至X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @example [{id: 'month', alias: '月份'}]
   */
  dimensions?: Dimensions

  /**
   * @description 双轴图指标
   * measures可以使用2个指标组, 代表普通双轴图的主轴和次轴指标, 每个指标组内的指标会自动合并为一个指标.
   * measures可以使用1个指标组, 再嵌套2个指标组, 绘制组合双轴图. 最外层的每一个组, 代表一个双轴图, 它们会纵向排列.
   * @example
   * 普通双轴图
   * [
   *   {
   *     id: "primaryAxis",
   *     alias: '主轴',
   *     children: [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}]
   *   },
   *   {
   *     id: "secondaryAxis",
   *     alias: '次轴',
   *     children: [{id: 'growth', alias: '增长率'}, {id: 'returnRatio', alias: '回报率'}]
   *   }
   * ]
   * 组合双轴图
   * [
   *   {
   *     id: "first",
   *     alias: "第一个双轴图",
   *     children: [
   *      {
   *        id: "primaryAxis",
   *        alias: '主轴',
   *        children: [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}]
   *      },
   *      {
   *        id: "secondaryAxis",
   *        alias: '次轴',
   *        children: [{id: 'growth', alias: '增长率'}, {id: 'returnRatio', alias: '回报率'}]
   *      },
   *     ]
   *   },
   *   {
   *     id: "second",
   *     alias: "第二个双轴图",
   *     children: [
   *      {
   *        id: "primaryAxis2",
   *        alias: '主轴',
   *        children: [{id: 'profit2', alias: '利润'}, {id: 'sales2', alias: '销售额'}]
   *      },
   *      {
   *        id: "secondaryAxis2",
   *        alias: '次轴',
   *        children: [{id: 'growth2', alias: '增长率'}, {id: 'returnRatio2', alias: '回报率'}]
   *      },
   *     ]
   *   },
   * ]
   */
  measures?: MeasureTree
  /**
   * @description 双轴图指标, 是measures的简化形式
   * 组合的双轴图指标配置, 每个对象都代表一个双轴图, 双轴图之间纵向排列, 必须是数组.
   * 每个配置对象内, primaryMeasures代表所有的主轴指标, secondaryMeasures代表所有的次轴指标, primaryMeasures和secondaryMeasures可配置为数组或一个对象
   * primaryMeasures 如果是多个指标, 则会自动合并
   * secondaryMeasures 如果是多个指标, 则会自动合并
   * @example
   * 如下示例配置了一个双轴图, 主轴有1个value指标, 次轴有1个growth指标
   * [
   *   {
   *     primaryMeasures:   {id: 'value', alias: '数值'}
   *     secondaryMeasures: {id: 'growth', alias: '增长率'}
   *   }
   * ]
   * 如下示例配置了2个纵向排列的双轴图, 第一个双轴图, 主轴有1个value指标, 次轴有一个growth指标, 第二个双轴图, 主轴有2个指标: profit与sales, 次轴有一个returnRatio指标
   * [
   *   {
   *     primaryMeasures:  {id: 'value', alias: '数值'}
   *     secondaryMeasures: {id: 'growth', alias: '增长率'}
   *   },
   *   {
   *     primaryMeasures:   [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}],
   *     secondaryMeasures: [{id: 'returnRatio', alias: '回报率'}]
   *   }
   * ]
   */
  dualMeasures?: DualMeasures

  /**
   * @description 双轴图的主次轴的图表类型, 用于定义双轴图的类型, 包括折线图, 柱状图, 面积图等, 当measures有多组时, dualChartType可以配置为数组, 每项对应一个双轴图的子图表类型.
   * @example
   * {primary: 'line', secondary: 'bar'}
   * [{primary: 'line', secondary: 'bar'}, {primary: 'column', secondary: 'area'}]
   */
  dualChartType?: DualChartType | DualChartType[]

  /**
   * @description 用于定义双轴图的两根轴的刻度是否对齐, 当measures有多组时, alignTicks可以配置为数组, 每项对应一个双轴图的刻度是否对齐.
   * @example {"chartType":"dualAxis","dataset":[{"date":"2019","profit":10,"sales":100},{"date":"2020","profit":30,"sales":200},{"date":"2021","profit":30,"sales":300},{"date":"2022","profit":50,"sales":500}],"alignTicks":[false,true],"dualMeasures":[{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]},{"primaryMeasures":[{"id":"profit"}],"secondaryMeasures":[{"id":"sales"}]}]}
   */
  alignTicks?: boolean | boolean[]

  /**
   * @description 双轴图的主Y轴配置, 用于定义双轴图的主Y轴, 包括主Y轴的位置, 样式等. 当measures有多组时, primaryYAxis可以配置为数组, 每项对应一个双轴图的主Y轴.
   */
  primaryYAxis?: YLinearAxis | YLinearAxis[]

  /**
   * @description 双轴图的次Y轴配置, 用于定义双轴图的次Y轴, 包括次Y轴的位置, 样式等. 当measures有多组时, secondaryYAxis可以配置为数组, 每项对应一个双轴图的次Y轴.
   */
  secondaryYAxis?: YLinearAxis | YLinearAxis[]

  /**
   * @default transparent 默认为透明背景
   * @description 图表的背景颜色, 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
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
   * 垂直提示框
   * @description 垂直提示框配置, 用于定义图表的垂直提示框, 包括垂直提示框的颜色、标签样式等.
   */
  crosshairRect?: CrosshairRect

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
   * 矩形图元样式
   * @description 条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  barStyle?: BarStyle | BarStyle[]
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
   * 点图元样式
   * @description 点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  pointStyle?: PointStyle | PointStyle[]
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
   * @description 国际化配置, 图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
   * @default 'zh-CN'
   */
  locale?: Locale
}
