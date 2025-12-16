import type { MeasureEncoding } from '../encoding'
import type { NumFormat } from '../format/numFormat'

/**
 * @description 指标
 */
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
   * @description 自动数值格式化 当配置了 format 时, 该配置项失效
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
  numFormat?: NumFormat

  /**
   * @description same as numFormat, 指标的数值格式化, 会自动应用于label、tooltip
   */
  format?: NumFormat

  /**
   * @description 指标映射的通道
   * - primaryYAxis: 指标映射的主y轴, 仅用于双轴图
   * - secondaryYAxis: 指标映射的次y轴, 仅用于双轴图
   * - xAxis: 指标映射的x轴, 适用于条形图、散点图
   * - yAxis: 指标映射的y轴, 适用于柱状图、折线图、面积图、散点图
   * - angle: 指标映射的角度, 适用于饼图、环形图、雷达图
   * - radius: 指标映射的半径, 适用于玫瑰图
   * - size: 指标映射的大小, 适用于漏斗图、散点图
   * - detail: 指标映射的详情, 适用于透视表、热力图
   * - column: 指标映射的列, 仅适用于表格
   * - color: 指标映射的颜色, 适用于所有图表
   * - label: 指标映射的标签, 适用于所有图表
   * - tooltip: 指标映射的提示, 适用于所有图表
   */
  encoding?: MeasureEncoding

  /**
   * @description 以扁平的指标配置形式, 构建树形指标组, parentId指向父级指标组的id, 用于构建指标树
   * @tip 指标树的配置存在两种形式, 方式一是直接配置带children的指标树, 方式二是配置parentId的扁平指标列表, 两种方式不能同时配置
   */
  parentId?: string
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
