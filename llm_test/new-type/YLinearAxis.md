### YLinearAxis

数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.

```typescript
export interface NumFormat {
  /**
   * @description 数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法
   * @default 'number'
   */
  type?: 'number' | 'percent' | 'permille' | 'scientific'

  /**
   * @description 数值格式化比例, 不能为0
   * @default 1
   * @example
   * - 100000 转换为 10万, ratio:10000, symbol:"万"
   * - 100000 转换为 10K, ratio:1000, symbol:"K"
   */
  ratio?: number

  /**
   * @description 数值格式化符号, 例如%、‰
   * @default ''
   * @example
   * - 100000 转换为 10万, ratio:10000, symbol:"万"
   * - 100000 转换为 10K, ratio:1000, symbol:"K"
   */
  symbol?: string

  /**
   * @description 数值格式化千分位分隔符
   * @default true
   */
  thousandSeparator?: boolean

  /**
   * @description 数值格式化后缀
   * @default ''
   */
  suffix?: string
  /**
   * @description 数值格式化前缀
   * @default ''
   */
  prefix?: string

  /**
   * @description 数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits
   * @default 2
   * @example
   * - 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)
   */
  fractionDigits?: number

  /**
   * @description 数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits
   * @default undefined
   * @example
   * - 1234.5678 转换为 1000, significantDigits:1
   * - 1234.5678 转换为 1200, significantDigits:2
   * - 1234.5678 转换为 1230, significantDigits:3
   * - 1234.5678 转换为 1234, significantDigits:4
   * - 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
   * - 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)
   */
  significantDigits?: number

  /**
   * @description 数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority
   * @default 'morePrecision'
   * @example
   * - 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
   * - 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)
   */
  roundingPriority?: 'morePrecision' | 'lessPrecision'

  /**
   * @description 数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode
   * @default 'halfExpand'
   * @example
   */
  roundingMode?:
    | 'floor'
    | 'ceil'
    | 'expand'
    | 'trunc'
    | 'halfCeil'
    | 'halfFloor'
    | 'halfExpand'
    | 'halfTrunc'
    | 'halfEven'
}

export type YLinearAxis = {
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
   * @description 是否自动格式化数值轴的刻度标签, 仅对数值轴生效, autoFormat 为 true 时, numFormat 配置失效
   */
  autoFormat?: boolean

  /**
   * @description 数值轴的数字格式化, 仅对数值轴生效, 优先级低于 autoFormat
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
```
