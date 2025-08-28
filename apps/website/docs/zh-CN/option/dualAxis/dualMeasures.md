# dualMeasures

**Type:** `DualMeasures | undefined`

**描述:**
双轴图指标, 是measures的简化形式
  组合的双轴图指标配置, 每个对象都代表一个双轴图, 双轴图之间纵向排列, 必须是数组.
  每个配置对象内, primaryMeasures代表所有的主轴指标, secondaryMeasures代表所有的次轴指标, primaryMeasures和secondaryMeasures可配置为数组或一个对象
  primaryMeasures 如果是多个指标, 则会自动合并
  secondaryMeasures 如果是多个指标, 则会自动合并

**示例:**
如下示例配置了一个双轴图, 主轴有1个value指标, 次轴有1个growth指标
  [
    {
      primaryMeasures:   {id: 'value', alias: '数值'}
      secondaryMeasures: {id: 'growth', alias: '增长率'}
    }
  ]
  如下示例配置了2个纵向排列的双轴图, 第一个双轴图, 主轴有1个value指标, 次轴有一个growth指标, 第二个双轴图, 主轴有2个指标: profit与sales, 次轴有一个returnRatio指标
  [
    {
      primaryMeasures:  {id: 'value', alias: '数值'}
      secondaryMeasures: {id: 'growth', alias: '增长率'}
    },
    {
      primaryMeasures:   [{id: 'profit', alias: '利润'}, {id: 'sales', alias: '销售额'}],
      secondaryMeasures: [{id: 'returnRatio', alias: '回报率'}]
    }
  ]


## primaryMeasures

**Type:** `Measure | Measure[] | undefined`

**描述:**
No description

**示例:**
无示例


### id

**Type:** `string`

**描述:**
指标id, 不能重复

**示例:**
无示例

### alias

**Type:** `string | undefined`

**描述:**
指标别名, 允许重复, 未填写时, alias 为 id

**示例:**
无示例

### autoFormat

**Type:** `boolean | undefined`

**描述:**
自动数值格式化
  开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
  格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
  例如:
  当locale为zh-CN: 749740.264会被自动格式化为74.45万
  当locale为en-US: 749740.264会被自动格式化为744.5K

**示例:**
无示例

### format

**Type:** `NumFormat | undefined`

**描述:**
指标的数值格式化, 会自动应用于label、tooltip

**示例:**
无示例


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

**描述:**
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

**示例:**
无示例

#### ratio

**Type:** `number | undefined`

**描述:**
数值格式化比例, 百分比和千分比需要设置比例

**示例:**
- 100000 转换为 10万, ratio:10000, symbol:"万"
  - 100000 转换为 10K, ratio:1000, symbol:"K"
  - 100000 转换为 100%, ratio:100, symbol:"%"
  - 100000 转换为 100‰, ratio:1000, symbol:"‰"

#### symbol

**Type:** `string | undefined`

**描述:**
数值格式化符号, 例如%、‰

**示例:**
- 100000 转换为 10万, ratio:10000, symbol:"万"
  - 100000 转换为 10K, ratio:1000, symbol:"K"
  - 100000 转换为 100%, ratio:100, symbol:"%"
  - 100000 转换为 100‰, ratio:1000, symbol:"‰"

#### thousandSeparator

**Type:** `boolean | undefined`

**描述:**
数值格式化千分位分隔符

**示例:**
无示例

#### suffix

**Type:** `string | undefined`

**描述:**
数值格式化后缀

**示例:**
无示例

#### prefix

**Type:** `string | undefined`

**描述:**
数值格式化前缀

**示例:**
无示例

#### fractionDigits

**Type:** `number | undefined`

**描述:**
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

**示例:**
- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
  - 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

**描述:**
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

**示例:**
- 1234.5678 转换为 1000, significantDigits:1
  - 1234.5678 转换为 1200, significantDigits:2
  - 1234.5678 转换为 1230, significantDigits:3
  - 1234.5678 转换为 1234, significantDigits:4
  - 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

**描述:**
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

**示例:**
- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
  - 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

**描述:**
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

**示例:**
无示例

## secondaryMeasures

**Type:** `Measure | Measure[] | undefined`

**描述:**
No description

**示例:**
无示例


### id

**Type:** `string`

**描述:**
指标id, 不能重复

**示例:**
无示例

### alias

**Type:** `string | undefined`

**描述:**
指标别名, 允许重复, 未填写时, alias 为 id

**示例:**
无示例

### autoFormat

**Type:** `boolean | undefined`

**描述:**
自动数值格式化
  开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
  格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
  例如:
  当locale为zh-CN: 749740.264会被自动格式化为74.45万
  当locale为en-US: 749740.264会被自动格式化为744.5K

**示例:**
无示例

### format

**Type:** `NumFormat | undefined`

**描述:**
指标的数值格式化, 会自动应用于label、tooltip

**示例:**
无示例


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

**描述:**
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

**示例:**
无示例

#### ratio

**Type:** `number | undefined`

**描述:**
数值格式化比例, 百分比和千分比需要设置比例

**示例:**
- 100000 转换为 10万, ratio:10000, symbol:"万"
  - 100000 转换为 10K, ratio:1000, symbol:"K"
  - 100000 转换为 100%, ratio:100, symbol:"%"
  - 100000 转换为 100‰, ratio:1000, symbol:"‰"

#### symbol

**Type:** `string | undefined`

**描述:**
数值格式化符号, 例如%、‰

**示例:**
- 100000 转换为 10万, ratio:10000, symbol:"万"
  - 100000 转换为 10K, ratio:1000, symbol:"K"
  - 100000 转换为 100%, ratio:100, symbol:"%"
  - 100000 转换为 100‰, ratio:1000, symbol:"‰"

#### thousandSeparator

**Type:** `boolean | undefined`

**描述:**
数值格式化千分位分隔符

**示例:**
无示例

#### suffix

**Type:** `string | undefined`

**描述:**
数值格式化后缀

**示例:**
无示例

#### prefix

**Type:** `string | undefined`

**描述:**
数值格式化前缀

**示例:**
无示例

#### fractionDigits

**Type:** `number | undefined`

**描述:**
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

**示例:**
- 1234.5678 转换为 1235, fractionDigits:0 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.6, fractionDigits:1 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.57, fractionDigits:2 (roundingMode:halfCeil)
  - 1234.5678 转换为 1230.568, fractionDigits:3 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.5678, fractionDigits:4 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.56780, fractionDigits:5 (roundingMode:halfCeil)

#### significantDigits

**Type:** `number | undefined`

**描述:**
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

**示例:**
- 1234.5678 转换为 1000, significantDigits:1
  - 1234.5678 转换为 1200, significantDigits:2
  - 1234.5678 转换为 1230, significantDigits:3
  - 1234.5678 转换为 1234, significantDigits:4
  - 1234.5678 转换为 1234.6, significantDigits:5 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.57, significantDigits:6 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.568, significantDigits:7 (roundingMode:halfCeil)
  - 1234.5678 转换为 1234.5678, significantDigits:8 (roundingMode:halfCeil)

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

**描述:**
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

**示例:**
- 1234.5678 转换为 1230, significantDigits:3 (roundingPriority:lessPrecision)
  - 1234.5678 转换为 1234.5678, significantDigits:3 (roundingPriority:morePrecision)

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

**描述:**
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

**示例:**
无示例

