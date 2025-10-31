export type Encoding = {
  /**
   * @description X轴映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在笛卡尔坐标系中用于显示离散的X轴, 例如柱状图、折线图、面积图、双轴图
   */
  x?: string[]
  /**
   * @description Y轴映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在笛卡尔坐标系中用于显示离散的Y轴, 例如条形图
   */
  y?: string[]
  /**
   * @description 角度映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在饼图中用于显示角度
   */
  angle?: string[]
  /**
   * @description 半径映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在饼图中用于显示半径
   */
  radius?: string[]
  /**
   * @description 细分映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在图表中显示更细粒度的数据
   */
  detail?: string[]
  /**
   * @description 颜色映射通道, 支持放入多个维度字段 或 1个 指标字段
   * - 多个维度: 合并所有维度为离散的图例项
   * - 1个指标: 映射为连续的颜色渐变
   */
  color?: string[]
  /**
   * @description 大小映射通道, 支持放入 1个 指标字段
   * - 1个指标: 映射为连续的大小渐变
   */
  size?: string[]
  /**
   * @description 提示映射通道, 支持放入多个维度字段 和 多个指标字段, 每多一个字段, tooltip内就会多显示一个字段的信息
   */
  tooltip?: string[]
  /**
   * @description 标签映射通道, 支持放入多个维度字段 和 多个指标字段, 每多一个字段, label内就会多显示一个字段的信息
   */
  label?: string[]
  /**
   * @deprecated use color instead, 已弃用, 请使用颜色替代
   */
  group?: string[]

  /**
   * @description 行映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在图表中进行行透视
   */
  row?: string[]
  /**
   * @description 列映射通道, 支持放入多个维度字段, 不支持放入指标字段, 在图表中进行列透视
   */
  column?: string[]
  /**
   * @description 明细数据通道，用于直方图/boxplot等图表设置明细数据
   */
  value?: string[]
  /**
   * @description 四分之一数据通道，用于boxplot图表设置四分之一数据
   */
  q1?: string[]
  /**
   * @description 中位数数据通道，用于boxplot图表设置中位数数据
   */
  median?: string[]
  /**
   * @description 四分之三数据通道，用于boxplot图表设置四分之三数据
   */
  q3?: string[]
  /**
   * @description 最小值数据通道，用于boxplot图表设置最小值数据
   */
  min?: string[]
  /**
   * @description 最大值数据通道，用于boxplot图表设置最大值数据
   */
  max?: string[]
  /**
   * @description 异常值数据通道，用于boxplot图表设置异常值数据
   */
  outliers?: string[]
  /**
   * @description 连续x轴起始数据通道，用于直方图图表设置连续x轴起始数据
   */
  x0?: string[]
  /**
   * @description 连续x轴结束数据通道，用于直方图图表设置连续x轴结束数据
   */
  x1?: string[]
}
