# measures
## 描述
双轴图指标
measures可以使用2个指标组, 代表普通双轴图的主轴和次轴指标, 每个指标组内的指标会自动合并为一个指标.
measures可以使用1个指标组, 再嵌套2个指标组, 绘制组合双轴图. 最外层的每一个组, 代表一个双轴图, 它们会纵向排列.


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