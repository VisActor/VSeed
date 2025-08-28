import { type Selector, type Selectors } from '../../dataSelector'

/**
 * @description 水平标注线, 根据用户设置的selector 或 yValue, 从左向右绘制一条末尾有箭头的线, 标签默认在标注线的终点正下方
 */
export type AnnotationHorizontalLine = {
  /**
   * @description 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * @description  固定的y值, 用于标注水平线, 类目轴在y方向, 则可输入维值, 数值轴在y方向, 则可输入具体的数值
   */
  yValue?: (number | string) | (number | string)[]
  /**
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
  /**
   * 文本位置
   * @description 标注线的标签位置（标签相对线的相对位置）。
   * @example 'outsideEnd'
   */
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd'
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
   * @description 文本对齐方式, 一般情况下, 无需设置
   * 建议设置为'right', 这样可以确保文本在标注线的左侧
   * right: 文本在参考线的左侧, 文本的右侧边缘对齐(水平)标注线的终点
   * left: 文本在参考线的右侧, 文本的左侧边缘对齐(水平)标注线的终点
   * center: 文本在参考线的中心, 文本的中心对齐(水平)标注线的终点
   * @example 'right'
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 无需设置
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在参考线的底部, 文本的顶部边缘对齐(水平)标注线
   * middle: 文本在参考线的中心, 文本的中心对齐(水平)标注线
   * bottom: 文本在参考线的顶部, 文本的底部边缘对齐(水平)标注线
   * @example 'top'
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
   * 背景边框宽度
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
   * 线可见
   * @description 线可见
   * @example true
   */
  lineVisible?: boolean
  /**
   * @description 线颜色
   * @example 'red'
   */
  lineColor?: string
  /**
   * @description 线宽度
   * @example 2
   */
  lineWidth?: number
  /**
   * @description 线样式
   * @example 'solid'
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted'
}
