# measures

**Type:** `MeasureTree | undefined`

:::note{title=描述}
指标



玫瑰图的指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.

:::

**示例**
[{id: 'value', alias: '数值'}]




## id

**Type:** `string`

:::note{title=描述}
指标组id, 不能重复

:::

## alias

**Type:** `string | undefined`

:::note{title=描述}
指标组别名, 允许重复, 未填写时, alias 为 id

:::

## autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
自动数值格式化

开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式

格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.

例如:

当locale为zh\-CN: 749740.264会被自动格式化为74.45万

当locale为en\-US: 749740.264会被自动格式化为744.5K

:::

## format

**Type:** `NumFormat | undefined`

:::note{title=描述}
指标的数值格式化, 会自动应用于label、tooltip

:::


### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 百分比和千分比需要设置比例

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"
\- 100000 转换为 100%, ratio:100, symbol:"%"
\- 100000 转换为 100‰, ratio:1000, symbol:"‰"



### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"
\- 100000 转换为 100%, ratio:100, symbol:"%"
\- 100000 转换为 100‰, ratio:1000, symbol:"‰"



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

## encoding

**Type:** `MeasureEncoding | MeasureEncoding[] | undefined`

:::note{title=描述}
指标映射的通道

\- primaryYAxis: 指标映射的主y轴, 仅用于双轴图

\- secondaryYAxis: 指标映射的次y轴, 仅用于双轴图

\- xAxis: 指标映射的x轴, 适用于条形图、散点图

\- yAxis: 指标映射的y轴, 适用于柱状图、折线图、面积图、散点图

\- angle: 指标映射的角度, 适用于饼图、环形图、雷达图

\- radius: 指标映射的半径, 适用于玫瑰图

\- size: 指标映射的大小, 适用于漏斗图、散点图

\- color: 指标映射的颜色, 适用于所有图表

\- label: 指标映射的标签, 适用于所有图表

\- tooltip: 指标映射的提示, 适用于所有图表

:::

## parentId

**Type:** `string | undefined`

:::note{title=描述}
以扁平的指标配置形式, 构建树形指标组, parentId指向父级指标组的id, 用于构建指标树

:::

:::tip{title=Tip}
指标树的配置存在两种形式, 方式一是直接配置带children的指标树, 方式二是配置parentId的扁平指标列表, 两种方式不能同时配置

:::

## children

**Type:** `(Measure | MeasureGroup)[] | undefined`

:::note{title=描述}
指标组的子指标或指标组

:::


