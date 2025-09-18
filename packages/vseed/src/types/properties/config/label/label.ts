import type { NumFormat } from '../../format'

export type Label = {
  /**
   * @description 标签功能是否开启
   */
  enable: boolean

  /**
   * @description 标签是否换行
   */
  wrap?: boolean

  /**
   * @description 标签是否显示指标值
   * 多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾
   */
  showValue?: boolean

  /**
   * @description 标签是否显示指标值的百分比
   * 多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾
   */
  showValuePercent?: boolean

  /**
   * @description 标签数值是否自动格式化, autoFormat 为 true 时, numFormat 配置失效
   */
  autoFormat?: boolean

  /**
   * @description 标签数值格式化配置, 会和 `measure` 中的 `format` 进行合并, `measure` 中的 `format` 优先级更高. numFormat 优先级低于 autoFormat
   */
  numFormat?: NumFormat

  /**
   * @description 标签字体大小
   */
  labelFontSize?: number

  /**
   * @description 标签字体粗细
   */
  labelFontWeight?: number | string

  /**
   * @description 标签背景色
   */
  labelBackgroundColor?: string

  /**
   * @description 标签字体颜色
   */
  labelColor?: string

  /**
   * @description 标签是否自动根据图元颜色进行字体颜色的反转
   */
  labelColorSmartInvert?: boolean

  /**
   * @description 标签位置
   */
  labelPosition?: 'inside' | 'outside'

  /**
   * @description 标签防重叠功能是否启用
   */
  labelOverlap?: boolean

  /**
   * @description 标签布局方式, 仅对饼图、环形图生效且`labelPosition`为`outside`时生效
   * - arc: 按弧形为标签布局
   * - labelLine: 标签两端对齐, 通过引导线连接扇形图元与标签
   * - edge: 标签两端对齐, 通过引导线连接扇形图元与标签, 并且贴近图表两端边缘
   */
  labelLayout?: 'arc' | 'labelLine' | 'edge'
}
