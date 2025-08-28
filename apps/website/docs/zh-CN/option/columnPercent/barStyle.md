# barStyle
## 描述
矩形图元样式

条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
支持全局样式或条件样式配置
数据筛选器
若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
若未配置selector, 则样式全局生效.


## 属性

### barColor

**类型:** `string | undefined`

**描述:**
柱状图颜色

柱状图颜色

---

### barColorOpacity

**类型:** `number | undefined`

**描述:**
柱状图颜色透明度

柱状图颜色透明度

---

### barBorderColor

**类型:** `string | undefined`

**描述:**
柱状图边框颜色

柱状图边框颜色

---

### barBorderWidth

**类型:** `number | undefined`

**描述:**
柱状图边框宽度

柱状图边框宽度

---

### barBorderStyle

**类型:** `"solid" | "dashed" | "dotted" | undefined`

**描述:**
柱状图边框样式

柱状图边框样式

---

### barRadius

**类型:** `number | number[] | undefined`

**描述:**
柱状图圆角

柱状图圆角