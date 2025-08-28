# measures
## 描述
指标

并列条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.


## Properties

### id

**Type:** `string`

**Description:**
指标组id, 不能重复

---

### alias

**Type:** `string | undefined`

**Description:**
指标组别名, 允许重复, 未填写时, alias 为 id

---

### autoFormat

**Type:** `boolean | undefined`

**Description:**
自动数值格式化
开启后, 图表的数据标签、提示信息, 会根据指标的数值, 自动根据语言环境, 选择合适的格式化方式
格式化规则为设置为十进制数值, 开启compact notation, 最小0位小数, 最大2位小数, 自动四舍五入, 使用浏览器提供的 Intl.NumberFormatOptions 实现该逻辑.
例如:
当locale为zh-CN: 749740.264会被自动格式化为74.45万
当locale为en-US: 749740.264会被自动格式化为744.5K