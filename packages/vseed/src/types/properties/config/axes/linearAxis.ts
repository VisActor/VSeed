import type { NumFormat } from "../../format"


export type XLinearAxis = {
  /**
   * @description 轴是否可见
   */
  visible?: boolean

  /**
   * @description 轴的最小值, 优先级高于 nice 与 zero
   */
  min?: number

  /**
   * @description 轴的最大值, 优先级高于 nice 与 zero
   */
  max?: number

  /**
   * @description 是否使用对数轴, 仅对数值轴生效
   */
  log?: boolean

  /**
   * @description 对数轴的底数, 仅对数值轴生效
   */
  logBase?: number

  /**
   * @description 是否自动调整轴的刻度间隔，使刻度标签更易读, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   */
  nice?: boolean

  /**
   * @description 轴是否反向展示, 仅对数值轴生效
   */
  inverse?: boolean

  /**
   * @description 是否在坐标轴上强制显示 0 值, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   */
  zero?: boolean


  /**
   * @description 是否自动格式化数值轴的刻度标签, 仅对数值轴生效, 当配置了 numFormat 时, 该配置项失效
   */
  autoFormat?: boolean

  /**
   * @description 数值轴的数字格式化, 仅对数值轴生效
   */
  numFormat?: NumFormat

  /**
   * @description X轴刻度标签
   */
  label?: {
    /**
     * @description 标签是否可见
     */
    visible?: boolean
    /**
     * @description 标签颜色
     */
    labelColor?: string
    /**
     * @description 标签字体大小
     */
    labelFontSize?: number
    /**
     * @description 标签字体粗细
     */
    labelFontWeight?: number
    /**
     * @description 标签旋转角度
     */
    labelAngle?: number
  }

  /**
   * @description X轴线
   */
  line?: {
    /**
     * @description 轴线是否可见
     */
    visible?: boolean
    /**
     * @description 轴线颜色
     */
    lineColor?: string
    /**
     * @description 轴线宽度
     */
    lineWidth?: number
  }

  /**
   * @description X轴刻度
   */
  tick?: {
    /**
     * 刻度是否可见
     * @default true
     */
    visible?: boolean
    /**
     * 刻度是否朝内
     * @default false
     */
    tickInside?: boolean
    /**
     * 刻度颜色
     */
    tickColor?: string
    /**
     * 刻度尺寸
     */
    tickSize?: number
  }

  /**
   * @description X轴标题
   */
  title?: {
    /**
     * 标题是否可见
     * @default false
     */
    visible?: boolean
    /**
     * 标题文本, 默认跟随字段配置
     */
    titleText?: string
    /**
     * 标题颜色
     */
    titleColor?: string
    /**
     * 标题字体大小
     */
    titleFontSize?: number
    /**
     * 标题字体粗细
     */
    titleFontWeight?: number
  }

  /**
   * @description X轴网格线
   */
  grid?: {
    visible?: boolean
    /**
     * 网格线颜色
     */
    gridColor?: string
    /**
     * 网格线宽度
     */
    gridWidth?: number
  }
}

export type YLinearAxis = XLinearAxis
