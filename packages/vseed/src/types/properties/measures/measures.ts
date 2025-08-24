import type { NumFormat } from './format/numFormat'

export type Measure = {
  /**
   * @description 指标id, 不能重复
   */
  id: string
  /**
   * @description 指标别名, 允许重复, 未填写时, alias 为 id
   * @default id
   */
  alias?: string
  /**
   * @description 自动数值格式化
   * 开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
   * 格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
   * 例如:
   * 当locale为zh-CN: 749740.264会被自动格式化为74.45万
   * 当locale为en-US: 749740.264会被自动格式化为744.5K
   * @default true
   */
  autoFormat?: boolean
  /**
   * @description 指标的数值格式化, 会自动应用于label、tooltip
   */
  format?: NumFormat
}
export type MeasureGroup = {
  /**
   * @description 指标组id, 不能重复
   */
  id: string
  /**
   * @description 指标组别名, 允许重复, 未填写时, alias 为 id
   * @default id
   */
  alias?: string
  /**
   * @description 指标组的子指标或指标组
   */
  children?: (Measure | MeasureGroup)[]
}
export type Measures = Measure[]
export type MeasureTree = (Measure | MeasureGroup)[]
