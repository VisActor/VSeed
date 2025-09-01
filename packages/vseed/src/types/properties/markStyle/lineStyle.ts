import { z } from 'zod'
import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'

export type LineStyle = {
  /**
   * 数据选择器
   * @description
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   * @type {Selector | Selectors}
   * @example 数值选择器
   * selector = "tool"
   * selector = ["tool", "book"]
   * selector = 100
   * selector = [100, 200]
   * @example 局部数据选择器
   * selector = { profit: 100 }
   * selector = [{ profit: 100 }, { profit: 200 }]
   * @example 条件维度选择器
   * selector = {
   *  field: 'category',
   *  operator: 'in',
   *  value: 'tool'
   * }
   * selector = {
   *  field: 'category',
   *  operator: 'not in',
   *  value: 'book'
   * }
   * @example 条件指标选择器
   * selector = {
   *  field: 'profit',
   *  operator: '>=',
   *  value: 100
   * }
   * selector = {
   *  field: 'profit',
   *  operator: 'between'
   *  value: [100, 300]
   * }
   */
  selector?: Selector | Selectors

  /**
   * @description 线段是否可见
   */
  lineVisible?: boolean
  /**
   * @description 线段是否平滑
   * @type {boolean}
   */
  lineSmooth?: boolean

  /**
   * @description 线段颜色
   */
  lineColor?: string
  /**
   * @description 线段颜色透明度
   */
  lineColorOpacity?: number
  /**
   * @description 线段宽度
   */
  lineWidth?: number
  /**
   * @description 线段样式
   * @example `lineStyle: 'solid'`
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted'
}

export const zLineStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  lineVisible: z.boolean().nullish(),
  lineSmooth: z.boolean().nullish(),
  lineColor: z.string().nullish(),
  lineColorOpacity: z.number().nullish(),
  lineWidth: z.number().nullish(),
  lineStyle: z.union([z.enum(['solid', 'dashed', 'dotted'])]).nullish(),
})
