import { z } from 'zod'
import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'

export type BarStyle = {
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
   * @description 柱图元(矩形图元)是否可见
   */
  barVisible?: boolean
  /**
   * @description 柱图元(矩形图元)颜色
   * @type {string}
   */
  barColor?: string
  /**
   * @description 柱图元(矩形图元)颜色透明度
   * @type {number}
   */
  barColorOpacity?: number
  /**
   * @description 柱图元(矩形图元)边框颜色
   * @type {string}
   */
  barBorderColor?: string
  /**
   * @description 柱图元(矩形图元)边框宽度
   * @type {number}
   */
  barBorderWidth?: number
  /**
   * @description 柱图元(矩形图元)边框样式
   * @type {number}
   * @example solid
   * @example dashed
   * @example dotted
   */
  barBorderStyle?: 'solid' | 'dashed' | 'dotted'
  /**
   * @description 柱图元(矩形图元)圆角
   * @type {number | number[]}
   * @example 4
   * @example [0, 0, 10, 10]
   */
  /**
   * @description 柱图元(矩形图元)描边透明度
   * @type {number}
   */
  barBorderOpacity?: number
  barRadius?: number | number[]
}

export const zBarStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  barVisible: z.boolean().nullish(),
  barColor: z.string().nullish(),
  barColorOpacity: z.number().nullish(),
  barBorderColor: z.string().nullish(),
  barBorderWidth: z.number().nullish(),
  barBorderStyle: z.union([z.literal('solid'), z.literal('dashed'), z.literal('dotted')]).nullish(),
  barRadius: z.union([z.number(), z.array(z.number())]).nullish(),
})
