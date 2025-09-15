export type Axis = {
  /**
   * 轴是否可见
   * @default true
   * @example true
   */
  visible?: boolean

  /**
   * 轴的最小值
   * @description 优先级高于 nice 与 zero
   * @default undefined
   * @example 100
   */
  min?: number

  /**
   * 轴的最大值
   * @description 优先级高于 nice 与 zero
   * @default undefined
   * @example 10000
   */
  max?: number

  /**
   * @description 是否使用对数轴, 仅对数值轴生效
   * @default false
   */
  log?: boolean

  /**
   * @description 对数轴的底数, 仅对数值轴生效
   * @default 10
   */
  logBase?: number

  /**
   * 是否自动调整轴的刻度间隔，使刻度标签更易读
   * @description 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   * @default true
   * @example true
   */
  nice?: boolean

  /**
   * 轴是否反向展示
   * @description 仅对数值轴生效
   * @default false
   * @example false
   */
  inverse?: boolean

  /**
   * 是否在坐标轴上强制显示 0 值,
   * @description 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   * @default true
   * @example true
   */
  zero?: boolean

  /**
   * 轴标签, 自动隐藏
   * @description 2个标签若重叠(间隔小于autoHideGap), 则自动隐藏导致重叠的标签. 仅对类目轴生效.
   * @default true
   */
  labelAutoHide?: boolean
  /**
   * 轴标签, 自动隐藏间隔
   * @description 若2个文本标签的间隔小于autoHideGap, 则自动隐藏导致重叠的标签. 仅对类目轴生效.
   *  autoHide开启时, 使用autoHide, 设置在autoHideSeparation上
   *  autoHide关闭时, 使用sampling采样, 设置在minGap上
   * @default 4
   */
  labelAutoHideGap?: number
  /**
   * 轴标签, 自动旋转
   * @description 当标签宽度超过轴长度时, 自动旋转标签. 仅对类目轴生效.
   * @default true
   */
  labelAutoRotate?: boolean
  /**
   * 轴标签, 自动旋转角度范围
   * @description 当自动旋转开启时, 标签旋转角度范围. 仅对类目轴生效.
   * @default [0, -45, -90]
   */
  labelAutoRotateAngleRange?: number[]
  /**
   * 轴标签, 自动限制长度,
   * @description 当标签宽度超过轴长度时, 超出部分省略号表示, 鼠标悬浮后可见标签, 自动限制标签宽度. 仅对类目轴生效.
   * @default true
   */
  labelAutoLimit?: boolean
  /**
   * 轴标签, 自动限制长度的最大长度
   * @description 当标签文本长度超过最大长度时, 超出部分省略号表示, 鼠标悬浮后可见标签. 仅对类目轴生效.
   */
  labelAutoLimitLength?: number

  /**
   * X轴刻度标签
   * @default true
   */
  label?: {
    /**
     * 标签是否可见
     * @default true
     */
    visible?: boolean
    /**
     * 标签颜色
     */
    labelColor?: string
    /**
     * 标签字体大小
     */
    labelFontSize?: number
    /**
     * 标签字体粗细
     */
    labelFontWeight?: number
    /**
     * 标签旋转角度
     */
    labelAngle?: number
  }

  /**
   * X轴线
   * @example
   * {
   *   visible: true,
   *   lineColor: '#ffeecc',
   *   lineWidth: 2,
   * }
   */
  line?: {
    /**
     * 轴线是否可见
     * @default true
     */
    visible?: boolean
    /**
     * 轴线颜色
     */
    lineColor?: string
    /**
     * 轴线宽度
     * @default 1
     */
    lineWidth?: number
  }

  /**
   * X轴刻度
   * @default true
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
   * X轴标题
   * @default false
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
   * X轴网格线
   * @default false
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
