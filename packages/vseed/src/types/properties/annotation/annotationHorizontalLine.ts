import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'
import { z } from 'zod'

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
   * @description (水平)标注线整体在Y方向的偏移像素距离, 一般情况下, 无需设置
   * 负值则整体向上偏移, 例如设置为-10, 则整个(水平)标注线组件包括文本、箭头、线段, 一起向上偏移10像素
   * 正值则整体向下偏移, 例如设置为10, 则整个(水平)标注线组件包括文本、箭头、线段, 一起向下偏移10像素
   * @example offsetY: 0
   */
  offsetY?: number
  /**
   * @description (水平)标注线整体在X方向的偏移像素距离, 一般情况下, 无需设置
   * 负值则整体向左偏移, 例如设置为-10, 则整个(水平)标注线组件包括文本、箭头、线段, 一起向左偏移10像素
   * 正值则整体向右偏移, 例如设置为10, 则整个(水平)标注线组件包括文本、箭头、线段, 一起向右偏移10像素
   * @example offsetX: 0
   */
  offsetX?: number
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
   * 背景边框宽度
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

export const zAnnotationHorizontalLine = z.object({
  selector: z.union([zSelector, zSelectors]).optional(),
  yValue: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]).optional(),
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

  lineVisible: z.boolean().default(true).optional(),
  lineColor: z.string().default('#212121').optional(),
  lineWidth: z.number().default(1).optional(),
  lineStyle: z
    .union([z.literal('solid'), z.literal('dashed'), z.literal('dotted')])
    .default('dashed')
    .optional(),

  backgroundVisible: z.boolean().default(true).optional(),
  backgroundColor: z.string().default('#212121').optional(),
  backgroundBorderColor: z.string().default('#212121').optional(),
  backgroundBorderRadius: z.number().default(4).optional(),
  backgroundBorderWidth: z.number().default(1).optional(),
  backgroundPadding: z.number().default(2).optional(),

  offsetX: z.number().default(0),
  offsetY: z.number().default(0),
})
