import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'
import { z } from 'zod'

export type AnnotationArea = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors

  /**
   * 标注的文本
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]

  /**
   * 文本位置
   * @description 文本位置
   * @example 'top'
   */
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'

  /**
   * 文本颜色
   * @description 文本颜色
   * @example 'red'
   */
  textColor?: string
  /**
   * 文本字体大小
   * @description 文本字体大小
   * @example 12
   */
  textFontSize?: number
  /**
   * 文本字体重量
   * @description 文本字体重量
   * @example 400
   */
  textFontWeight?: number

  /**
   * 文本对齐方式
   * @description 文本对齐方式
   * @example 'left'
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * 文本垂直对齐方式
   * @description 文本垂直对齐方式
   * @example 'middle'
   */
  textBaseline?: 'top' | 'middle' | 'bottom'

  /**
   * Y方向的, 偏移量
   * @description 文本Y方向的, 偏移量, 支持正负
   * @example offsetY: 10
   */
  offsetY?: number
  /**
   * X方向的, 偏移量
   * @description 文本X方向的, 偏移量, 支持正负
   * @example offsetX: -10
   */
  offsetX?: number

  /**
   * 背景可见
   * @description 背景可见
   * @example true
   */
  backgroundVisible?: boolean
  /**
   * 背景颜色
   * @description 背景颜色
   * @example 'red'
   */
  backgroundColor?: string
  /**
   * 背景边框颜色
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
   * 背景边框圆角
   * @description 背景边框圆角
   * @example 4
   */
  backgroundBorderRadius?: number
  /**
   * 背景内边距
   * @description 背景内边距
   * @example 4
   */
  backgroundPadding?: number

  /**
   * 面积区域颜色
   * @description 面积区域颜色
   * @example 'red'
   */
  areaColor?: string
  /**
   * 面积区域颜色透明度
   * @description 面积区域颜色透明度
   * @example 0.5
   */
  areaColorOpacity?: number
  /**
   * 面积区域边框颜色
   * @description 面积区域边框颜色
   * @default 'red'
   * @example 'red'
   */
  areaBorderColor?: number
  /**
   * 面积区域边框宽度
   * @description 面积区域边框宽度
   * @example 2
   */
  areaBorderWidth?: number
  /**
   * 面积区域边框圆角
   * @description 面积区域边框圆角
   * @example 4
   */
  areaBorderRadius?: number
  /**
   * 面积区域的边距
   * @description 面积区域的边距
   * @example 0
   */
  outerPadding?: number
}

export const zAnnotationArea = z.object({
  selector: z.union([zSelector, zSelectors]),
  textPosition: z
    .enum(['top', 'topRight', 'topLeft', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'right'])
    .default('top')
    .optional(),
  text: z.string().or(z.array(z.string())).optional(),
  textColor: z.string().default('#ffffff').optional(),
  textFontSize: z.number().default(12).optional(),
  textFontWeight: z.number().default(400).optional(),
  textAlign: z.enum(['left', 'right', 'center']).default('center').optional(),
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('middle').optional(),

  backgroundVisible: z.boolean().default(true).optional(),
  backgroundColor: z.string().default('#212121').optional(),
  backgroundBorderColor: z.string().optional(),
  backgroundBorderWidth: z.number().default(1).optional(),
  backgroundBorderRadius: z.number().default(4).optional(),
  backgroundPadding: z.number().optional(),

  areaColor: z.string().default('red').optional(),
  areaColorOpacity: z.number().default(0.5).optional(),
  areaBorderColor: z.number().optional(),
  areaBorderWidth: z.number().default(2).optional(),
  areaBorderRadius: z.number().default(4).optional(),

  outerPadding: z.number().optional(),
  offsetX: z.number().optional(),
  offsetY: z.number().optional(),
})
