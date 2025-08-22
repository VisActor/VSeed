import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'
import { z } from 'zod'

/**
 * @description 垂直标注线, 根据用户设置的selector 或 xValue, 从下向上绘制一条末尾有箭头的线, 标签默认在标注线终点的正左侧
 */
export type AnnotationVerticalLine = {
  /**
   * @description 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * @description 固定的x值, 用于标注垂直线, 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值
   */
  xValue?: (number | string) | (number | string)[]
  /**
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
  /**
   * @description 文本位置, 标注线的标签位置（标签相对线的相对位置）。
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
   * right: 文本在参考线的左侧, 文本的右侧边缘对齐(垂直)标注线
   * left: 文本在参考线的右侧, 文本的左侧边缘对齐(垂直)标注线
   * center: 文本在参考线的中心, 文本的中心对齐(垂直)标注线
   * @example 'right'
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 无需设置
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在参考线的底部, 文本的顶部边缘对齐(垂直)标注线的终点
   * middle: 文本在参考线的中心, 文本的中心对齐(垂直)标注线的终点
   * bottom: 文本在参考线的顶部, 文本的底部边缘对齐(垂直)标注线的终点
   * @example 'top'
   */
  textBaseline?: 'top' | 'middle' | 'bottom'
  /**
   * @description (垂直)标注线整体在Y方向的偏移像素距离, 一般情况下, 无需设置
   * 负值则整体向上偏移, 例如设置为-10, 则整个标注线组件包括文本、箭头、线段, 一起向上偏移10像素
   * 正值则整体向下偏移, 例如设置为10, 则整个标注线组件包括文本、箭头、线段, 一起向下偏移10像素
   * @example offsetY: 0
   */
  offsetY?: number
  /**
   * @description (垂直)标注线整体在X方向的偏移像素距离, 一般情况下, 无需设置
   * 负值则整体向左偏移, 例如设置为-10, 则整个标注线组件包括文本、箭头、线段, 一起向左偏移10像素
   * 正值则整体向右偏移, 例如设置为10, 则整个标注线组件包括文本、箭头、线段, 一起向右偏移10像素
   * @example offsetX: 0
   */
  offsetX?: number
  /**
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
  /**
   * @description 背景可见
   * @example true
   */
  backgroundVisible?: boolean
  /**
   * @description 背景颜色
   * @example 'red'
   */
  backgroundColor?: string
  /**
   * @description 背景边框颜色
   * @example 'red'
   */
  backgroundBorderColor?: string
  /**
   * @description 背景边框宽度
   * @example 2
   */
  backgroundBorderWidth?: number
  /**
   * @description 背景边框圆角
   * @example 4
   */
  backgroundBorderRadius?: number
  /**
   * @description 背景内边距
   * @example 4
   */
  backgroundPadding?: number
}

export const zAnnotationVerticalLine = z.object({
  selector: z.union([zSelector, zSelectors]).optional(),
  xValue: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]).optional(),
  text: z.string().or(z.array(z.string())).optional(),
  textPosition: z
    .enum(['outsideStart', 'outsideEnd', 'outsideMiddle', 'insideStart', 'insideMiddle', 'insideEnd'])
    .default('insideEnd')
    .optional(),
  textColor: z.string().default('#ffffff').optional(),
  textFontSize: z.number().default(12).optional(),
  textFontWeight: z.number().default(400).optional(),
  textAlign: z.enum(['left', 'right', 'center']).default('right').optional(),
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('top').optional(),
  lineVisible: z.boolean().optional(),
  lineColor: z.string().optional(),
  lineWidth: z.number().optional(),
  lineStyle: z.union([z.literal('solid'), z.literal('dashed'), z.literal('dotted')]).optional(),
  backgroundVisible: z.boolean().default(true).optional(),
  backgroundColor: z.string().default('#212121').optional(),
  backgroundBorderColor: z.string().optional(),
  backgroundBorderWidth: z.number().default(1).optional(),
  backgroundBorderRadius: z.number().default(4).optional(),
  backgroundPadding: z.number().optional(),
  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
})
