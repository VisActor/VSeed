### Label

标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.

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
export type Label = {
  /**
   * @description 标签功能是否开启
   */
  enable: boolean

  /**
   * @description 标签是否换行
   */
  wrap?: boolean

  /**
   * @description 标签是否显示指标值
   * 多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾
   */
  showValue?: boolean

  /**
   * @description 标签是否显示指标值的百分比
   * 多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾
   */
  showValuePercent?: boolean

  /**
   * @description 标签数值是否自动格式化, autoFormat 为 true 时, numFormat 配置失效
   */
  autoFormat?: boolean

  /**
   * @description 标签数值格式化配置, 会和 `measure` 中的 `format` 进行合并, `measure` 中的 `format` 优先级更高. numFormat 优先级低于 autoFormat
   */
  numFormat?: NumFormat

  /**
   * @description 标签字体大小
   */
  labelFontSize?: number

  /**
   * @description 标签字体粗细
   */
  labelFontWeight?: number | string

  /**
   * @description 标签背景色
   */
  labelBackgroundColor?: string

  /**
   * @description 标签字体颜色
   */
  labelColor?: string

  /**
   * @description 标签是否自动根据图元颜色进行字体颜色的反转
   */
  labelColorSmartInvert?: boolean

  /**
   * @description 标签位置
   */
  labelPosition?: 'inside' | 'outside'

  /**
   * @description 标签防重叠功能是否启用
   */
  labelOverlap?: boolean

  /**
   * @description 标签布局方式, 仅对饼图、环形图生效且`labelPosition`为`outside`时生效
   * - arc: 按弧形为标签布局
   * - labelLine: 标签两端对齐, 通过引导线连接扇形图元与标签
   * - edge: 标签两端对齐, 通过引导线连接扇形图元与标签, 并且贴近图表两端边缘
   */
  labelLayout?: 'arc' | 'labelLine' | 'edge'
}
```
