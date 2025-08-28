import { z } from 'zod'
import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'

export type PointStyle = {
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
   * 点大小
   * @description 点大小
   * @type {number}
   */
  pointSize?: number
  /**
   * 柱状图颜色
   * @description 柱状图颜色
   * @type {string}
   */
  pointColor?: string
  /**
   * 柱状图颜色透明度
   * @description 柱状图颜色透明度
   * @type {number}
   */
  pointColorOpacity?: number
  /**
   * 柱状图边框颜色
   * @description 柱状图边框颜色
   * @type {string}
   */
  pointBorderColor?: string
  /**
   * 柱状图边框宽度
   * @description 柱状图边框宽度
   * @type {number}
   */
  pointBorderWidth?: number
  /**
   * 柱状图边框样式
   * @description 柱状图边框样式
   * @type {number}
   * @example solid
   * @example dashed
   * @example dotted
   */
  pointBorderStyle?: 'solid' | 'dashed' | 'dotted'
}

export const zPointStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  pointSize: z.number().nullish(),
  pointColor: z.string().nullish(),
  pointColorOpacity: z.number().nullish(),
  pointBorderColor: z.string().nullish(),
  pointBorderWidth: z.number().nullish(),
  pointBorderStyle: z.union([z.enum(['solid', 'dashed', 'dotted'])]).nullish(),
})
