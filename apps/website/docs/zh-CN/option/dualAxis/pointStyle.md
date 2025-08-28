# pointStyle
## 描述
点图元样式

点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
支持全局样式或条件样式配置
数据筛选器
若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
若未配置selector, 则样式全局生效.


## 属性

### pointSize

**类型:** `number | undefined`

**描述:**
点大小

点大小

---

### pointColor

**类型:** `string | undefined`

**描述:**
点图元颜色

点图元颜色

---

### pointColorOpacity

**类型:** `number | undefined`

**描述:**
点图元颜色透明度

点图元颜色透明度

---

### pointBorderColor

**类型:** `string | undefined`

**描述:**
点图元边框颜色

点图元边框颜色

---

### pointBorderWidth

**类型:** `number | undefined`

**描述:**
点图元边框宽度

点图元边框宽度

---

### pointBorderStyle

**类型:** `"solid" | "dashed" | "dotted" | undefined`

**描述:**
点图元边框样式

点图元边框样式