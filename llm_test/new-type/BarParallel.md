```typescript
/**
 * 并列条形图类型定义
 * @description 并列条形图，适用于多指标横向并行对比场景，多个条形平行排列展示不同指标值
 * 适用场景:
 * - 类别名称较长时的多指标对比
 * - 排名与数值同时展示的横向比较
 * - 多维度数据的并列分析
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度会放至Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 默认开启图例、坐标轴、数据标签、提示信息
 */
export interface BarParallel {
  /**
   * 并列条形图
   * @description 并列条形图，适用于多指标横向并行对比场景
   * @type {'barParallel'}
   * @example 'barParallel'
   */
  chartType: 'barParallel'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 并列条形图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 并列条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {DimensionTree}
   * @example [{id: 'value1', alias: '指标1'}, {id: 'value2', alias: '指标2'}]
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
   * @description Y轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序
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
```

### Locale
图表语言配置, 支持'zh-CN'与'en-US'两种语言, 另外可以调用 intl.setLocale('zh-CN') 方法设置语言
```typescript
export type Locale = "zh-CN" | "en-US";

```
  