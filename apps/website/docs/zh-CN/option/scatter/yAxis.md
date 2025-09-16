# yAxis

**Type:** `XLinearAxis | undefined`

:::note{title=描述}
y轴



数值轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.

:::


## visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否可见

:::

## min

**Type:** `number | undefined`

:::note{title=描述}
轴的最小值, 优先级高于 nice 与 zero

:::

## max

**Type:** `number | undefined`

:::note{title=描述}
轴的最大值, 优先级高于 nice 与 zero

:::

## log

**Type:** `boolean | undefined`

:::note{title=描述}
是否使用对数轴, 仅对数值轴生效

:::

## logBase

**Type:** `number | undefined`

:::note{title=描述}
对数轴的底数, 仅对数值轴生效

:::

## nice

**Type:** `boolean | undefined`

:::note{title=描述}
是否自动调整轴的刻度间隔，使刻度标签更易读, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

## inverse

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否反向展示, 仅对数值轴生效

:::

## zero

**Type:** `boolean | undefined`

:::note{title=描述}
是否在坐标轴上强制显示 0 值, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

## autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
是否自动格式化数值轴的刻度标签, 仅对数值轴生效, autoFormat 为 true 时, numFormat 配置失效

:::

## numFormat

**Type:** `NumFormat | undefined`

:::note{title=描述}
数值轴的数字格式化, 仅对数值轴生效, 优先级低于 autoFormat

:::


### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 不能为0

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=描述}
数值格式化千分位分隔符

:::

### suffix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化后缀

:::

### prefix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化前缀

:::

### fractionDigits

**Type:** `number | undefined`

:::note{title=描述}
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

:::

**示例**
\- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
\- 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)



### significantDigits

**Type:** `number | undefined`

:::note{title=描述}
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

:::

**示例**
\- 1234.5678 转换为 1000, significantDigits:1
\- 1234.5678 转换为 1200, significantDigits:2
\- 1234.5678 转换为 1230, significantDigits:3
\- 1234.5678 转换为 1234, significantDigits:4
\- 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
\- 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)



### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=描述}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=描述}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

## label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=描述}
X轴刻度标签

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否可见

:::

### labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签颜色

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

### labelFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标签字体粗细

:::

### labelAngle

**Type:** `number | undefined`

:::note{title=描述}
标签旋转角度

:::

## line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
X轴线

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴线是否可见

:::

### lineColor

**Type:** `string | undefined`

:::note{title=描述}
轴线颜色

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
轴线宽度

:::

## tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=描述}
X轴刻度

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否可见

:::

### tickInside

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否朝内

:::

### tickColor

**Type:** `string | undefined`

:::note{title=描述}
刻度颜色

:::

### tickSize

**Type:** `number | undefined`

:::note{title=描述}
刻度尺寸

:::

## title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=描述}
X轴标题

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标题是否可见

:::

### titleText

**Type:** `string | undefined`

:::note{title=描述}
标题文本, 默认跟随字段配置

:::

### titleColor

**Type:** `string | undefined`

:::note{title=描述}
标题颜色

:::

### titleFontSize

**Type:** `number | undefined`

:::note{title=描述}
标题字体大小

:::

### titleFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标题字体粗细

:::

## grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; } | undefined`

:::note{title=描述}
X轴网格线

:::


### visible

**Type:** `boolean | undefined`

### gridColor

**Type:** `string | undefined`

:::note{title=描述}
网格线颜色

:::

### gridWidth

**Type:** `number | undefined`

:::note{title=描述}
网格线宽度

:::

