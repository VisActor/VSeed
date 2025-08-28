# dualMeasures

**Type:** `DualMeasures | undefined`

**Description:**
双轴图指标, 是measures的简化形式
  组合的双轴图指标配置, 每个对象都代表一个双轴图, 双轴图之间纵向排列, 必须是数组.
  每个配置对象内, primaryMeasures代表所有的主轴指标, secondaryMeasures代表所有的次轴指标, primaryMeasures和secondaryMeasures可配置为数组或一个对象
  primaryMeasures 如果是多个指标, 则会自动合并
  secondaryMeasures 如果是多个指标, 则会自动合并


## primaryMeasures

**Type:** `Measure | Measure[] | undefined`

**Description:**
No description


### id

**Type:** `string`

**Description:**
指标id, 不能重复

### alias

**Type:** `string | undefined`

**Description:**
指标别名, 允许重复, 未填写时, alias 为 id

### autoFormat

**Type:** `boolean | undefined`

**Description:**
自动数值格式化
  开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
  格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
  例如:
  当locale为zh-CN: 749740.264会被自动格式化为74.45万
  当locale为en-US: 749740.264会被自动格式化为744.5K

### format

**Type:** `NumFormat | undefined`

**Description:**
指标的数值格式化, 会自动应用于label、tooltip


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

**Description:**
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

#### ratio

**Type:** `number | undefined`

**Description:**
数值格式化比例, 百分比和千分比需要设置比例

#### symbol

**Type:** `string | undefined`

**Description:**
数值格式化符号, 例如%、‰

#### thousandSeparator

**Type:** `boolean | undefined`

**Description:**
数值格式化千分位分隔符

#### suffix

**Type:** `string | undefined`

**Description:**
数值格式化后缀

#### prefix

**Type:** `string | undefined`

**Description:**
数值格式化前缀

#### fractionDigits

**Type:** `number | undefined`

**Description:**
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

#### significantDigits

**Type:** `number | undefined`

**Description:**
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

**Description:**
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

**Description:**
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

## secondaryMeasures

**Type:** `Measure | Measure[] | undefined`

**Description:**
No description


### id

**Type:** `string`

**Description:**
指标id, 不能重复

### alias

**Type:** `string | undefined`

**Description:**
指标别名, 允许重复, 未填写时, alias 为 id

### autoFormat

**Type:** `boolean | undefined`

**Description:**
自动数值格式化
  开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
  格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
  例如:
  当locale为zh-CN: 749740.264会被自动格式化为74.45万
  当locale为en-US: 749740.264会被自动格式化为744.5K

### format

**Type:** `NumFormat | undefined`

**Description:**
指标的数值格式化, 会自动应用于label、tooltip


#### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

**Description:**
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

#### ratio

**Type:** `number | undefined`

**Description:**
数值格式化比例, 百分比和千分比需要设置比例

#### symbol

**Type:** `string | undefined`

**Description:**
数值格式化符号, 例如%、‰

#### thousandSeparator

**Type:** `boolean | undefined`

**Description:**
数值格式化千分位分隔符

#### suffix

**Type:** `string | undefined`

**Description:**
数值格式化后缀

#### prefix

**Type:** `string | undefined`

**Description:**
数值格式化前缀

#### fractionDigits

**Type:** `number | undefined`

**Description:**
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

#### significantDigits

**Type:** `number | undefined`

**Description:**
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

#### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

**Description:**
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

#### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

**Description:**
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode

