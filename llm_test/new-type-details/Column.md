```typescript
export interface Column {
  /**
   * 图表类型
   * @description 固定为 'column'
   */
  chartType: 'column'
  /**
   * 数据集
   * @description 定义图表的数据来源和结构。
   */
  dataset: Dataset
  /**
   * 维度
   * @description 柱状图的第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示。
   */
  dimensions?: Dimensions
  /**
   * 指标
   * @description 柱状图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示。
   */
  measures?: Measures
  /**
   * 图表的背景颜色
   * @description 支持颜色字符串、hex、rgb或rgba值。
   * @default 'transparent'
   */
  backgroundColor?: BackgroundColor
  /**
   * 颜色配置
   * @description 定义图表的颜色方案, 包括颜色列表, 颜色映射等。
   */
  color?: Color
  /**
   * 数据标签配置
   */
  label?: Label
  /**
   * 图例配置
   */
  legend?: Legend
  /**
   * 提示信息配置
   */
  tooltip?: Tooltip
  /**
   * x轴配置 (类目轴)
   */
  xAxis?: XBandAxis
  /**
   * y轴配置 (数值轴)
   */
  yAxis?: YLinearAxis
  /**
   * 图表主题
   * @description 内置 'light' 与 'dark' 两种主题。
   * @default 'light'
   */
  theme?: Theme
  /**
   * 矩形图元样式
   * @description 定义柱状图的样式，支持全局或按条件配置。
   */
  barStyle?: BarStyle | BarStyle[]
  /**
   * 标注点配置
   * @description 根据所选数据定义图表的标注点。
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
   * 垂直提示框
   * @description 垂直提示框配置, 用于定义图表的垂直提示框, 包括垂直提示框的颜色、标签样式等.
   */
  crosshairRect?: CrosshairRect
  /**
   * 柱状图 堆叠圆角
   * @description 条形图 堆叠圆角
   * @default 8
   */
  stackCornerRadius?: StackCornerRadius
  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言
   * @default 'zh-CN'
   */
  locale?: 'zh-CN' | 'en-US'
}
```