import { type Selector, type Selectors } from '../../dataSelector'
/**
 * @description 标注点, 根据用户设置的selector, 在数据点的左下方, 显示一个带有背景的标签.
 */
export type AnnotationPoint = {
  /**
   * @description 标注点的选择器, 用于选择数据点.
   */
  selector?: Selector | Selectors
  /**
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
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
   * @description 文本对齐方式, 一般情况下, 设置为right, 文本显示在标注点左侧, 确保显示在图表的可见区域
   * 建议设置为'right', 这样可以确保文本在标注点的左侧
   * right: 文本在标注点的左侧, 文本的右侧边缘对齐标注点
   * left: 文本在标注点的右侧, 文本的左侧边缘对齐标注点
   * center: 文本在标注点的中心, 文本的中心对齐标注点
   * @example 'right' 文本在标注点的左侧
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注点底部, 确保显示在图表的可见区域
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在标注点的底部, 文本的顶部边缘对齐标注点
   * middle: 文本在标注点的中心, 文本的中心对齐标注点
   * bottom: 文本在标注点的顶部, 文本的底部边缘对齐标注点
   * @example 'top' 文本在标注点的底部
   */
  textBaseline?: 'top' | 'middle' | 'bottom'
  /**
   * @description 背景可见
   * @example true
   */
  textBackgroundVisible?: boolean
  /**
   * @description 背景颜色
   * @example 'red'
   */
  textBackgroundColor?: string
  /**
   * @description 背景边框颜色
   * @example 'red'
   */
  textBackgroundBorderColor?: string
  /**
   * @description 背景边框宽度
   * @example 2
   */
  textBackgroundBorderWidth?: number
  /**
   * @description 背景边框圆角
   * @example 4
   */
  textBackgroundBorderRadius?: number
  /**
   * @description 背景内边距
   * @example 4
   */
  textBackgroundPadding?: number

  /**
   * @description 标注点整体在Y方向的偏移像素距离, 当标注点在图表上方(数值较大时)时, 建议设置为正值, 标注点在图表下方(数值较小时)时, 建议设置为负值.
   * 负值则整体向上偏移, 例如设置为-10, 则整个标注点组件包括文本、文本背景, 一起向上偏移10像素
   * 正值则整体向下偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向下偏移10像素
   * @example offsetY: 5, 标注点整体向下偏移5像素
   */
  offsetY?: number
  /**
   * @description 标注点整体在X方向的偏移像素距离, 当标注点在图表左侧(类目轴起点)时, 建议设置为正值, 标注点在图表右侧(类目轴终点)时, 建议设置为负值.
   * 负值则整体向左偏移, 例如设置为-10, 则整个标注点组件包括文本、文本背景, 一起向左偏移10像素
   * 正值则整体向右偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向右偏移10像素
   * @example offsetX: 5, 标注点整体向右偏移5像素
   */
  offsetX?: number
}
