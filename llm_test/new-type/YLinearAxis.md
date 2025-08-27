### YLinearAxis
数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
```typescript
export type YLinearAxis = {
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
```