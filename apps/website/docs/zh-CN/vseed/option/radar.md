# Radar

:::info{title=推荐}
\- 推荐字段配置: `1`个指标, `1`个维度

\- 支持数据重塑: 至少`1`个指标, `0`个维度

:::

:::info{title=编码映射}
雷达图支持以下视觉通道:

`angle`  : 角度通道, 支持`多个维度`, 按维度值映射至角度轴

`radius` : 半径通道, 支持`多个指标`, 按指标值映射至半径轴

`color`  : 颜色通道, 支持`多个维度`或 `一个指标`, 维度颜色用于区分不同的数据系列, 指标颜色用于线性映射指标值到图形颜色

`tooltip`: 提示通道, 支持`多个维度`与 `多个指标`, 会在鼠标悬停在数据点上时展示

`label`  : 标签通道, 支持`多个维度`与 `多个指标`, 会在数据点上展示数据标签

:::

:::note{title=描述}
雷达图，适用于多维度数据的对比分析，通过多轴坐标系展示各维度的数值分布

适用场景:

\- 多维度数据的综合表现对比

\- 多个对象在多个指标上的性能评估

\- 分类数据的多维度特征展示

:::

:::warning{title=Warning}
数据要求:

\- 至少1个数值字段（度量）

\- 第一个维度作为雷达图的各个维度轴，其他维度作为不同的系列进行对比

\- 支持多个指标分别作为不同的系列展示

默认开启的功能:

\- 默认开启图例、雷达坐标系、数据标签、提示信息、数值缩放

:::


## chartType

**Type:** `"radar"`

:::note{title=描述}
雷达图



雷达图，通过多轴坐标系展示多维度数据对比关系

:::

**示例**
'radar'




## dataset

**Type:** `Record<string | number, any>[]`

:::note{title=描述}
数据集



符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 玫瑰图的数据最终会被转换为2个维度, 1个指标.

:::

**示例**
[{month:'1月', value:100}, {month:'2月', value:150}, {month:'3月', value:120}]




## dimensions

**Type:** `RadarDimension[] | undefined`

:::note{title=描述}
维度



雷达图的第一个维度被映射到角度轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.

:::

**示例**
[{id: 'category', alias: '类别'}]




### id

**Type:** `string`

:::note{title=描述}
维度对应的字段id

:::

### alias

**Type:** `string | undefined`

:::note{title=描述}
维度别名

:::

### encoding

**Type:** `"color" | "detail" | "tooltip" | "label" | "row" | "column" | "angle" | undefined`

:::note{title=描述}
维度映射的通道

\- angle: 支持将多个维度映射到角度通道

\- color: 支持将多个维度映射到颜色通道

\- detail: 支持将多个维度映射到详情通道

\- tooltip: 支持将多个维度映射到提示通道

\- label: 支持将多个维度映射到标签通道

\- row: 支持将多个维度映射到行通道

\- column: 支持将多个维度映射到列通道

:::


## measures

**Type:** `RadarMeasure[] | undefined`

:::note{title=描述}
指标



雷达图的指标会自动合并为一个指标, 映射到半径轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.

:::

**示例**
[{id: 'value', alias: '数值'}]




### id

**Type:** `string`

:::note{title=描述}
指标id, 不能重复

:::

### alias

**Type:** `string | undefined`

:::note{title=描述}
指标别名, 允许重复, 未填写时, alias 为 id

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
自动数值格式化 当配置了 format 时, 该配置项失效

开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式

格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.

例如:

当locale为zh\-CN: 749740.264会被自动格式化为74.45万

当locale为en\-US: 749740.264会被自动格式化为744.5K

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=描述}
指标的数值格式化, 会自动应用于label、tooltip

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 不能为0

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=描述}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化前缀

:::

#### fractionDigits

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



#### significantDigits

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



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=描述}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=描述}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### format

**Type:** `NumFormat | undefined`

:::note{title=描述}
same as numFormat, 指标的数值格式化, 会自动应用于label、tooltip

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 不能为0

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=描述}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化前缀

:::

#### fractionDigits

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



#### significantDigits

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



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=描述}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=描述}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### encoding

**Type:** `"color" | "tooltip" | "label" | "radius" | undefined`

:::note{title=描述}
指标映射的通道

\- radius: 指标映射的半径

\- color: 指标映射的颜色

\- label: 指标映射的标签

\- tooltip: 指标映射的提示

:::

### parentId

**Type:** `string | undefined`

:::note{title=描述}
以扁平的指标配置形式, 构建树形指标组, parentId指向父级指标组的id, 用于构建指标树

:::

:::tip{title=Tip}
指标树的配置存在两种形式, 方式一是直接配置带children的指标树, 方式二是配置parentId的扁平指标列表, 两种方式不能同时配置

:::


## backgroundColor

**Type:** `BackgroundColor`

:::note{title=描述}
图表的背景颜色



背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'

:::


## color

**Type:** `Color | undefined`

:::note{title=描述}
颜色



颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.

:::


### colorScheme

**Type:** `string[] | undefined`

:::note{title=描述}
离散颜色配色方案, 颜色配色方案用于定义图表中不同元素的颜色

:::

**示例**
['#FFCDD2,#F8BBD0,#E1BEE7,#D1C4E9,#C5CAE9,#BBDEFB,#B3E5FC,#B2EBF2,#B2DFDB,#C8E6C9,#DCEDC8,#F0F4C3,#FFF9C4,#FFECB3,#FFE0B2']



### linearColorScheme

**Type:** `string[] | undefined`

:::note{title=描述}
线性渐变颜色配色方案, 线性渐变颜色配色方案用于定义图表中不同元素的颜色

:::

**示例**
['#FFCDD2, #F8BBD0]



### colorMapping

**Type:** `Record<string, string> | undefined`

:::note{title=描述}
颜色映射, 颜色映射用于将数据值映射到具体的颜色

:::

**示例**
{
 'profit': 'red',
 'sales': 'blue',
}



### positiveColor

**Type:** `string | undefined`

:::note{title=描述}
正负颜色配置, 用于定义图表中正值的颜色

:::

### negativeColor

**Type:** `string | undefined`

:::note{title=描述}
正负颜色配置, 用于定义图表中负值的颜色

:::


## label

**Type:** `Label | undefined`

:::note{title=描述}
标签



标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.

:::


### enable

**Type:** `false | true`

:::note{title=描述}
标签功能是否开启

:::

### wrap

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否换行

:::

### showValue

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示指标值

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### showValuePercent

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示指标值的百分比

多指标的场景, 无需担心多个指标的值会矛盾, 因为所有的绘图相关的指标, 都会经过`foldMeasures`处理, 合并为一个指标, 代表一个数据点, 所以不会矛盾

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### showDimension

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否显示维度标签

展示所有维度标签

注意: encoding的label优先级更高, 此配置不影响encoding的label

:::

### autoFormat

**Type:** `boolean | undefined`

:::note{title=描述}
标签数值是否自动格式化, autoFormat 为 true 时, numFormat 配置失效

:::

### numFormat

**Type:** `NumFormat | undefined`

:::note{title=描述}
标签数值格式化配置, 会和 `measure` 中的 `format` 进行合并, `measure` 中的 `format` 优先级更高. numFormat 优先级低于 autoFormat

:::


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

:::note{title=描述}
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

:::

#### ratio

**Type:** `number | undefined`

:::note{title=描述}
数值格式化比例, 不能为0

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### symbol

**Type:** `string | undefined`

:::note{title=描述}
数值格式化符号, 例如%、‰

:::

**示例**
\- 100000 转换为 10万, ratio:10000, symbol:"万"
\- 100000 转换为 10K, ratio:1000, symbol:"K"



#### thousandSeparator

**Type:** `boolean | undefined`

:::note{title=描述}
数值格式化千分位分隔符

:::

#### suffix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化后缀

:::

#### prefix

**Type:** `string | undefined`

:::note{title=描述}
数值格式化前缀

:::

#### fractionDigits

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



#### significantDigits

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



#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

:::note{title=描述}
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

:::

**示例**
\- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
\- 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)



#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

:::note{title=描述}
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=描述}
标签字体粗细

:::

### labelBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
标签背景色

:::

### labelStroke

**Type:** `string | undefined`

:::note{title=描述}
标签描边颜色

:::

### labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签字体颜色

:::

### labelColorSmartInvert

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否自动根据图元颜色进行字体颜色的反转

:::

### labelPosition

**Type:** `"inside" | "outside" | undefined`

:::note{title=描述}
标签位置

:::

### labelOverlap

**Type:** `boolean | undefined`

:::note{title=描述}
标签防重叠功能是否启用

:::

### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
标签筛选，默认selectors之间条件关系为Or

:::


#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::


## legend

**Type:** `Legend | undefined`

:::note{title=描述}
图例



图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.

:::


### enable

**Type:** `boolean | undefined`

:::note{title=描述}
图例功能是否开启

:::

**示例**
enable: true



### border

**Type:** `boolean | undefined`

:::note{title=描述}
图例边框是否开启

:::

**示例**
border: true



:::warning{title=Warning}
仅离散图例生效

:::

### labelColor

**Type:** `string | undefined`

:::note{title=描述}
图例字体颜色

:::

### pagerIconColor

**Type:** `string | undefined`

:::note{title=描述}
分页器icon颜色

:::

### pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=描述}
分页器icon置灰颜色

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
图例字体大小

:::

**示例**
labelFontSize: 10



### labelFontColor

**Type:** `string | undefined`

:::note{title=描述}
图例字体颜色

:::

### labelFontWeight

**Type:** `string | number | undefined`

:::note{title=描述}
图例字体粗细

:::

**示例**
labelFontWeight: 400



### shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=描述}
图例形状

:::

**示例**
shapeType: 'circle'



:::warning{title=Warning}
仅离散图例生效

:::

### position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=描述}
图例位置

:::

**示例**
position: 'rightTop'



### maxSize

**Type:** `number | undefined`

:::note{title=描述}
存在大量图例时, 最大列数 或 图例最大行数

如果position为水平方向(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize控制显示的列数

如果position为垂直方向(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize控制显示的行数

:::

**示例**
maxSize: 2



:::warning{title=Warning}
仅离散图例生效

:::


## tooltip

**Type:** `Tooltip | undefined`

:::note{title=描述}
提示信息



提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.

:::


### enable

**Type:** `false | true`

:::note{title=描述}
提示信息功能是否开启

:::


## brush

**Type:** `Brush | undefined`

:::note{title=描述}
框选



框选配置，用于开启/关闭 brush 框选能力

:::


### enable

**Type:** `boolean | undefined`

:::note{title=描述}
是否开启brush框选

:::

### brushType

**Type:** `"rect" | "x" | "y" | "polygon" | undefined`

:::note{title=描述}
brush的类型



定义刷选框的形状和刷选方向

\- `rect`: 矩形框选，可以在X轴和Y轴两个方向上同时进行框选

\- `polygon`: 多边形框选，通过点击多个点绘制任意多边形进行框选

\- `x`: X轴方向框选，只在X轴方向上进行框选，Y轴方向不限制

\- `y`: Y轴方向框选，只在Y轴方向上进行框选，X轴方向不限制

:::

### brushMode

**Type:** `"single" | "multiple" | undefined`

:::note{title=描述}
框选模式，单选还是多选



定义刷选的模式

\- `single`: 单选模式，每次只能有一个刷选框

\- `multiple`: 多选模式，可以同时存在多个刷选框

:::

### removeOnClick

**Type:** `boolean | undefined`

:::note{title=描述}
框选结束是否清除选框

:::

### inBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
被框选中的数据样式



定义被刷选中的数据点的样式

:::


#### opacity

**Type:** `number | undefined`

:::note{title=描述}
不透明度



被框选中的数据点的不透明度，取值范围 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=描述}
描边颜色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
描边宽度

:::

### outOfBrushStyle

**Type:** `{ opacity?: number; stroke?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
未被框选中的数据样式



定义未被刷选中的数据点的样式

:::


#### opacity

**Type:** `number | undefined`

:::note{title=描述}
不透明度



未被框选中的数据点的不透明度，取值范围 0\-1

:::

#### stroke

**Type:** `string | undefined`

:::note{title=描述}
描边颜色

:::

#### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
描边宽度

:::


## theme

**Type:** `Theme | undefined`

:::note{title=描述}
图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置



内置light与dark两种主题, 用户可以通过Builder自定义主题

:::

**示例**
'dark'

'light'

'customThemeName'




### length

**Type:** `number`

### brand

**Type:** `unique symbol`


## pointStyle

**Type:** `PointStyle | PointStyle[] | undefined`

:::note{title=描述}
点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.

支持全局样式或条件样式配置

数据筛选器

若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
数据选择器



若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::

**示例**
数值选择器
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局部数据选择器
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件维度选择器
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

条件指标选择器
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::

### pointVisible

**Type:** `boolean | undefined`

:::note{title=描述}
点是否可见

:::

### pointSize

**Type:** `number | undefined`

:::note{title=描述}
点大小



点大小

:::

### pointColor

**Type:** `string | undefined`

:::note{title=描述}
点图元颜色



点图元颜色

:::

### pointColorOpacity

**Type:** `number | undefined`

:::note{title=描述}
点图元颜色透明度



点图元颜色透明度

:::

### pointBorderColor

**Type:** `string | undefined`

:::note{title=描述}
点图元边框颜色



点图元边框颜色

:::

### pointBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
点图元边框宽度



点图元边框宽度

:::

### pointBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
点图元边框样式



点图元边框样式

:::

**示例**
solid

dashed

dotted




## lineStyle

**Type:** `LineStyle | LineStyle[] | undefined`

:::note{title=描述}
线图元样式配置, 用于定义图表的线图元样式, 包括线图元的颜色, 透明度, 曲线等.

支持全局样式或条件样式配置

数据筛选器

若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
数据选择器



若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::

**示例**
数值选择器
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局部数据选择器
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件维度选择器
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

条件指标选择器
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::

### lineVisible

**Type:** `boolean | undefined`

:::note{title=描述}
线段是否可见

:::

### lineSmooth

**Type:** `boolean | undefined`

:::note{title=描述}
线段是否平滑

:::

### lineColor

**Type:** `string | undefined`

:::note{title=描述}
线段颜色

:::

### lineColorOpacity

**Type:** `number | undefined`

:::note{title=描述}
线段颜色透明度

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
线段宽度

:::


## areaStyle

**Type:** `AreaStyle | AreaStyle[] | undefined`

:::note{title=描述}
面积图元样式配置, 用于定义图表的面积图元样式, 包括面积图元的颜色, 透明度, 边框等.

支持全局样式或条件样式配置

数据筛选器

若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::


### selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
数据选择器



若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::

**示例**
数值选择器
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局部数据选择器
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件维度选择器
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

条件指标选择器
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




#### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

#### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

#### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

#### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::

### areaVisible

**Type:** `boolean | undefined`

:::note{title=描述}
面积图元是否可见



面积图元是否可见

:::

### areaColor

**Type:** `string | undefined`

:::note{title=描述}
面积图元的颜色



面积图元的颜色

:::

### areaColorOpacity

**Type:** `number | undefined`

:::note{title=描述}
面积图元的颜色透明度



面积图元的颜色透明度

:::


## locale

**Type:** `Locale | undefined`

:::note{title=描述}
语言



图表语言配置, 支持'zh\-CN'与'en\-US'两种语言, 另外可以调用 intl.setLocale('zh\-CN') 方法设置语言

:::

