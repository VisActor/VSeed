export type XBandAxis = {
  /**
   * @description 轴是否可见
   */
  visible?: boolean

  /**
   * @description 轴是否反向展示, 仅对数值轴生效
   */
  inverse?: boolean

  /**
   * @description 是否在坐标轴上强制显示 0 值, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   */
  zero?: boolean

  /**
   * @description  轴标签, 自动隐藏, 2个标签若重叠(间隔小于autoHideGap), 则自动隐藏导致重叠的标签. 仅对类目轴生效.
   */
  labelAutoHide?: boolean
  /**
   * @description 轴标签, 自动隐藏间隔, 若2个文本标签的间隔小于autoHideGap, 则自动隐藏导致重叠的标签. 仅对类目轴生效.
   *  autoHide开启时, 使用autoHide, 设置在autoHideSeparation上
   *  autoHide关闭时, 使用sampling采样, 设置在minGap上
   */
  labelAutoHideGap?: number
  /**
   * @description  轴标签, 自动旋转, 当标签宽度超过轴长度时, 自动旋转标签. 仅对类目轴生效.
   */
  labelAutoRotate?: boolean
  /**
   * @description 轴标签, 自动旋转角度范围, 当自动旋转开启时, 标签旋转角度范围. 仅对类目轴生效.
   */
  labelAutoRotateAngleRange?: number[]
  /**
   * @description 轴标签, 自动限制长度, 当标签宽度超过轴长度时, 超出部分省略号表示, 鼠标悬浮后可见标签, 自动限制标签宽度. 仅对类目轴生效.
   */
  labelAutoLimit?: boolean
  /**
   * @description 轴标签, 自动限制长度的最大长度, 当标签文本长度超过最大长度时, 超出部分省略号表示, 鼠标悬浮后可见标签. 仅对类目轴生效.
   */
  labelAutoLimitLength?: number

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
export type YBandAxis = XBandAxis
