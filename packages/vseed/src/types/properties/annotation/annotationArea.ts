import { type Selector, type Selectors } from '../../dataSelector'

export type AnnotationArea = {
  /**
   * @description 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
  /**
   * @description 文本位置
   * @example 'top'
   */
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'

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
   * @description 文本对齐方式, 一般情况下, 设置为right, 文本显示在标注区域中间, 确保显示在图表的可见区域
   * 建议设置为'center', 这样可以确保文本在标注区域的中间
   * right: 文本在标注区域的左侧, 文本的右侧边缘对齐标注区域
   * left: 文本在标注区域的右侧, 文本的左侧边缘对齐标注区域
   * center: 文本在标注区域的中心, 文本的中心对齐标注区域
   * @example 'center' 文本在标注区域的中间
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注区域底部, 确保显示在图表的可见区域
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在标注区域的底部, 文本的顶部边缘对齐标注区域
   * middle: 文本在标注区域的中心, 文本的中心对齐标注区域
   * bottom: 文本在标注区域的顶部, 文本的底部边缘对齐标注区域
   * @example 'top' 文本在标注区域的底部
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
   * 背景边框颜色
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
   * 背景边框圆角
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
   * @description 标注区域区域颜色
   * @example 'red'
   */
  areaColor?: string
  /**
   * @description 标注区域区域颜色透明度
   * @example 0.5
   */
  areaColorOpacity?: number
  /**
   * @description 标注区域区域边框颜色
   * @example 'red'
   */
  areaBorderColor?: string
  /**
   * @description 标注区域区域边框宽度
   * @example 2
   */
  areaBorderWidth?: number
  /**
   * @description 标注区域区域边框圆角
   * @example 4
   */
  areaBorderRadius?: number
  /**
   * @description 标注区域区域的边距
   * @example 0
   */
  outerPadding?: number
}
