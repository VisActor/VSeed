/**
 * @description 十字准星线配置，是一种用于在图表中显示十字准星线（提示线）的配置类型
 */
export type CrosshairLine = {
  /**
   * @description 是否显示十字准星线
   */
  visible?: boolean
  /**
   * @description 十字准星线颜色
   */
  lineColor?: string
  /**
   * @description 十字准星线标签颜色
   */
  labelColor?: string
  /**
   * @description 是否显示十字准星线标签
   */
  labelVisible?: boolean
  /**
   * @description 十字准星线标签背景颜色
   */
  labelBackgroundColor?: string
}

/**
 * @description 十字准星线矩形区域配置，是一种用于在图表中显示十字准星线矩形区域的配置类型
 */
export type CrosshairRect = {
  /**
   * @description 是否显示十字准星线矩形区域
   */
  visible?: boolean
  /**
   * @description 十字准星线矩形区域颜色
   */
  rectColor?: string
  /**
   * @description 十字准星线矩形区域标签颜色
   */
  labelColor?: string
  /**
   * @description 是否显示十字准星线矩形区域标签
   */
  labelVisible?: boolean
  /**
   * @description 十字准星线矩形区域标签背景颜色
   */
  labelBackgroundColor?: string
}
