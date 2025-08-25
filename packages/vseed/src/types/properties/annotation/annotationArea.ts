import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'
import { z } from 'zod'

export type AnnotationArea = {
  /**
   * @description 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors
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
   * @description 文本对齐方式, 一般情况下, 设置为right, 文本显示在标注面中间, 确保显示在图表的可见区域
   * 建议设置为'center', 这样可以确保文本在标注面的中间
   * right: 文本在标注面的左侧, 文本的右侧边缘对齐标注面
   * left: 文本在标注面的右侧, 文本的左侧边缘对齐标注面
   * center: 文本在标注面的中心, 文本的中心对齐标注面
   * @example 'center' 文本在标注面的中间
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注面底部, 确保显示在图表的可见区域
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在标注面的底部, 文本的顶部边缘对齐标注面
   * middle: 文本在标注面的中心, 文本的中心对齐标注面
   * bottom: 文本在标注面的顶部, 文本的底部边缘对齐标注面
   * @example 'top' 文本在标注面的底部
   */
  textBaseline?: 'top' | 'middle' | 'bottom'
  /**
   * @description 标注面整体在Y方向的偏移像素距离, 当标注面在图表上方(数值较大时)时, 建议设置为正值, 标注面在图表下方(数值较小时)时, 建议设置为负值.
   * 负值则整体向上偏移, 例如设置为-10, 则整个标注面组件包括文本、面图元, 一起向上偏移10像素
   * 正值则整体向下偏移, 例如设置为10, 则整个标注面组件包括文本、面图元, 一起向下偏移10像素
   * @example offsetY: 5, 标注面整体向下偏移5像素
   */
  offsetY?: number
  /**
   * @description 标注面整体在X方向的偏移像素距离, 当标注面在图表左侧(类目轴起点)时, 建议设置为正值, 标注面在图表右侧(类目轴终点)时, 建议设置为负值.
   * 负值则整体向左偏移, 例如设置为-10, 则整个标注面组件包括文本、面图元, 一起向左偏移10像素
   * 正值则整体向右偏移, 例如设置为10, 则整个标注面组件包括文本、面图元, 一起向右偏移10像素
   * @example offsetX: 5, 标注面整体向右偏移5像素
   */
  offsetX?: number
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
   * 背景边框颜色
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
   * 背景边框圆角
   * @description 背景边框圆角
   * @example 4
   */
  backgroundBorderRadius?: number
  /**
   * @description 背景内边距
   * @example 4
   */
  backgroundPadding?: number
  /**
   * @description 面积区域颜色
   * @example 'red'
   */
  areaColor?: string
  /**
   * @description 面积区域颜色透明度
   * @example 0.5
   */
  areaColorOpacity?: number
  /**
   * @description 面积区域边框颜色
   * @default 'red'
   * @example 'red'
   */
  areaBorderColor?: number
  /**
   * @description 面积区域边框宽度
   * @example 2
   */
  areaBorderWidth?: number
  /**
   * @description 面积区域边框圆角
   * @example 4
   */
  areaBorderRadius?: number
  /**
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
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('top').optional(),

  backgroundVisible: z.boolean().default(true).optional(),
  backgroundColor: z.string().default('#191d24').optional(),
  backgroundBorderColor: z.string().default('#191d24').optional(),
  backgroundBorderWidth: z.number().default(1).optional(),
  backgroundBorderRadius: z.number().default(4).optional(),
  backgroundPadding: z.number().default(4).optional(),

  areaColor: z.string().default('#888888').optional(),
  areaColorOpacity: z.number().default(0.15).optional(),
  areaBorderColor: z.string().default('#888888').optional(),
  areaBorderWidth: z.number().default(1).optional(),
  areaBorderRadius: z.number().default(4).optional(),

  outerPadding: z.number().default(4).optional(),
  offsetX: z.number().default(0).optional(),
  offsetY: z.number().default(0).optional(),
})
