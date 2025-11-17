/**
 * @description 局部加权回归线配置项
 */
export interface LowessRegressionLine {
  /**
   * @description 回归线颜色
   * 用于设置回归线的颜色，如果不设置，默认使用图表的主颜色
   */
  color?: string
  /**
   * @description 回归线宽度
   * 用于设置回归线的宽度，单位为像素，默认值为1
   */
  lineWidth?: number
  /**
   * @description 回归线样式
   * 用于设置回归线的样式，例如实线、虚线等，默认值为实线
   */
  lineDash?: number[]
  /**
   * @description 回归线标签文本
   * 用于设置回归线的标签文本，空字符串表示不显示标签
   */
  text?: string
  /**
   * @description 文本颜色
   * @example 'red'
   */
  textColor?: string
  /**
   * @description 文本字体大小
   * @example 12
   */
  textFontSize?: number
  /**
   * @description 文本字体重量
   * @example 400
   */
  textFontWeight?: number
  /**
   * @description 是否显示置信区间
   */
  confidenceIntervalVisible?: boolean
  /**
   * @description 置信区间数值设定，默认95%置信度
   * @default 0.95
   */
  confidenceLevel?: number
  /**
   * @description 置信区间颜色
   */
  confidenceIntervalColor?: string
  /**
   * @description 置信区间透明度
   * @example 0.5
   */
  confidenceIntervalOpacity?: number
}
