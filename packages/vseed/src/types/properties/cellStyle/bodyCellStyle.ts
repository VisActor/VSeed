import { z } from 'zod'
import { zSelector, zSelectors, type Selector, type Selectors } from '../../dataSelector'

export type BodyCellStyle = {
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
   * 单元格背景色
   */
  backgroundColor?: string
  /**
   * 单元格文字颜色
   */
  textColor?: string
  /**
   * 单元格文字大小
   */
  textFontSize?: number
  /**
   * 单元格边框颜色
   */
  borderColor?: string
  /**
   * 单元格边框线宽
   */
  borderLineWidth?: number
}

export const zBodyCellStyle = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  backgroundColor: z.string().nullish(),
  textColor: z.string().nullish(),
  textFontSize: z.number().nullish(),
  borderColor: z.string().nullish(),
  borderLineWidth: z.number().nullish(),
})
