### Measures
```typescript
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
export type Measures = Measure[]
```

#### NumFormat
```typescript
export interface NumFormat {
  /**
   * @description 数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法
   * @default 'number'
   */
  type?: 'number' | 'percent' | 'permille' | 'scientific'

  /**
   * @description 数值格式化比例, 百分比和千分比需要设置比例
   * @default 1
   * @example
   * - 100000 转换为 10万, ratio:10000, symbol:"万"
   * - 100000 转换为 10K, ratio:1000, symbol:"K"
   * - 100000 转换为 100%, ratio:100, symbol:"%"
   * - 100000 转换为 100‰, ratio:1000, symbol:"‰"
   */
  ratio?: number

  /**
   * @description 数值格式化符号, 例如%、‰
   * @default ''
   * @example
   * - 100000 转换为 10万, ratio:10000, symbol:"万"
   * - 100000 转换为 10K, ratio:1000, symbol:"K"
   * - 100000 转换为 100%, ratio:100, symbol:"%"
   * - 100000 转换为 100‰, ratio:1000, symbol:"‰"
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
```
