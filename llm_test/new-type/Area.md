```typescript
/**
 * @recommend
 * - 推荐字段配置: `1`个指标, `2`个维度
 * - 支持数据重塑: 至少`1`个指标, `0`个维度
 * @encoding
 * 面积图支持以下视觉通道:
 * `xAxis`  : x轴通道, 支持`多个维度`, 按维度值映射至x轴
 * `yAxis`  : y轴通道, 支持`多个指标`, 按指标值映射至y轴
 * `color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色
 * `tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示
 * `label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签
 *
 * @description 面积图, 适用于展示数据随时间变化的趋势及累积关系, 通过填充区域增强数据对比. X轴为类目轴(分类数据), Y轴为数值轴(连续数据).
 * 适用场景:
 * - 展示单一数据系列的趋势变化
 * - 强调总量随时间的累积效果
 * - 对比多个数据系列的总量差异
 * @warning
 * 数据要求:
 * - 至少1个指标字段（度量）
 * - 第一个维度字段映射到X轴，其余维度字段会与指标名称(存在多个指标时)合并, 作为图例项展示.
 * - 所有指标会自动合并为一个指标
 * 默认开启的功能:
 * - 模块开启堆叠
 * - 默认开启图例、坐标轴、区域填充、数据标签、提示信息
 */
export interface Area {
  /**
   * 面积图
   * @description 面积图，展示数据趋势及累积关系的图表类型
   * @type {'area'}
   * @example
   * ```js {2}
   * {
   *   chartType: 'area',
   *   dataset: [{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}],
   * }
   * ```
   */
  chartType: 'area'
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
   * @description 面积图的指标会自动合并为一个指标, 映射到Y轴, 指标名称会与其余维度合并, 作为图例项展示.
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
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * @description 垂直标注线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * @description 水平标注线配置, 根据选择的数据, 定义图表的标注水平线, 包括标注水平线的位置, 样式等.
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
  