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
   * 注意: encoding的label优先级更高, 此配置不影响encoding的label
   */
  showValue?: boolean

  /**
   * @description 标签是否显示指标值的百分比
   * 多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾
   * 注意: encoding的label优先级更高, 此配置不影响encoding的label
   */
  showValuePercent?: boolean

  /**
   * @description 标签是否显示维度标签
   * 展示所有维度标签
   * 注意: encoding的label优先级更高, 此配置不影响encoding的label
   */
  showDimension?: boolean

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
   * @description 标签描边颜色
   */
  labelStroke?: string

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
}
