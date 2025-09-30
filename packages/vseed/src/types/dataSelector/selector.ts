import { z } from 'zod'
import type { Datum } from '../properties'

export type ValueSelector = string | number

export type PartialDatumSelector = Datum

/**
 * @description 指标选择器, 用于选择数据项中指标字段的值
 */
export type MeasureSelector = {
  /**
   * @description 指标字段, measures 某一项的 id
   */
  field: string
  /**
   * @description 操作符
   * - =: 选择数据项中指标字段的值等于 value 的数据项
   * - ==: 选择数据项中指标字段的值等于 value 的数据项
   * - !=: 选择数据项中指标字段的值不等于 value 的数据项
   * - >: 选择数据项中指标字段的值大于 value 的数据项
   * - <: 选择数据项中指标字段的值小于 value 的数据项
   * - >=: 选择数据项中指标字段的值大于等于 value 的数据项
   * - <=: 选择数据项中指标字段的值小于等于 value 的数据项
   * - between: 选择数据项中指标字段的值在 value 之间的 data item
   */
  operator?: '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between'
  /**
   * @description 操作符
   * - =: 选择数据项中指标字段的值等于 value 的数据项, 会将值转换为字符串后进行比较, 因此 1 == "1" 为 true
   * - ==: 选择数据项中指标字段的值精准等于 value 的数据项, 不会做任何特殊处理, 因此 1 == "1" 为 false
   * - !=: 选择数据项中指标字段的值不等于 value 的数据项
   * - >: 选择数据项中指标字段的值大于 value 的数据项
   * - <: 选择数据项中指标字段的值小于 value 的数据项
   * - >=: 选择数据项中指标字段的值大于等于 value 的数据项
   * - <=: 选择数据项中指标字段的值小于等于 value 的数据项
   * - between: 选择数据项中指标字段的值在 value 之间的 data item
   * same as operator
   */
  op?: '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between'
  /**
   * @description 选择数据项中指标字段的值
   * - 仅 op 为 between 时, value 为长度为2的数组, 数组中的元素为指标字段的最小值和最大值
   * - 其他情况, value 为指标字段的单个值
   */
  value: string | number | Array<string | number>
  // /**
  //  * @description 是否使用原始数据进行数据匹配, 开启后会有更多的数据被匹配到
  //  * 若下述数据, measures 仅设置了 value, field 为 isHigh 或 isLow, op 为 =, value 为 1,
  //  * 关闭useOrigin时, 数据项并不会考虑measures之外的字段, 因此field为isHigh或isLow的字段会被忽略
  //  * 开启useOrigin时, 会直接使用整个数据项进行匹配
  //  * [
  //  *  {value: 100, isHigh: 1, isLow: 0},
  //  *  {value: 200, isHigh: 0, isLow: 1},
  //  *  {value: 300, isHigh: 1, isLow: 0},
  //  * ]
  //  * @default false
  //  */
  // useOrigin?: boolean
}

/**
 * @description 维度选择器, 用于选择数据项中维度字段的值
 */
export type DimensionSelector = {
  /**
   * @description 维度字段, dimensions 某一项的 id
   */
  field: string
  /**
   * @description 操作符
   * - in: 选择数据项中维度字段的值在 value 中的数据项
   * - not in: 选择数据项中维度字段的值不在 value 中的数据项
   */
  operator?: 'in' | 'not in'
  /**
   * @description 操作符
   * - in: 选择数据项中维度字段的值在 value 中的数据项
   * - not in: 选择数据项中维度字段的值不在 value 中的数据项
   * same as operator
   */
  op?: 'in' | 'not in'
  /**
   * @description 选择数据项中维度字段的值, 支持数组
   */
  value: string | number | Array<string | number>
  // /**
  //  * @description 是否使用原始数据进行数据匹配, 开启后会有更多的数据被匹配到
  //  * 若下述数据, dimensions 仅设置了 name, field 为 name, op 为 =, value 为 "high",
  //  * 关闭useOrigin时, 数据项并不会考虑dimensions之外的字段, 因此field为name的字段会被忽略
  //  * 开启useOrigin时, 会直接使用整个数据项进行匹配
  //  * [
  //  *  {name: "low", isHigh: "false", isLow: "true"},
  //  *  {name: "low", isHigh: "false", isLow: "true"},
  //  *  {name: "high", isHigh: "true", isLow: "false"},
  //  * ]
  //  * @default false
  //  */
  // useOrigin?: boolean
}

export type Selector = ValueSelector | PartialDatumSelector | MeasureSelector | DimensionSelector

export type Selectors = Array<Selector>

export const zSelector = z.union([
  z.string(),
  z.number(),
  z.object({
    field: z.string(),
    operator: z.enum(['=', '==', '!=', '>', '<', '>=', '<=', 'between']).nullish(),
    op: z.enum(['=', '==', '!=', '>', '<', '>=', '<=', 'between']).nullish(),
    value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
  }),
  z.object({
    field: z.string(),
    operator: z.enum(['in', 'not in']).nullish(),
    op: z.enum(['in', 'not in']).nullish(),
    value: z.union([z.string(), z.number(), z.array(z.union([z.string(), z.number()]))]),
  }),
])

export const zSelectors = z.array(zSelector)
