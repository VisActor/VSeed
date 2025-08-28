# lineStyle
## 描述
线图元样式

线图元样式配置, 用于定义图表的线图元样式, 包括线图元的颜色, 透明度, 曲线等.
支持全局样式或条件样式配置
数据筛选器
若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
若未配置selector, 则样式全局生效.


## Properties

### lineSmooth

**Type:** `boolean | undefined`

**Description:**
折线图是否平滑

折线图是否平滑

---

### lineColor

**Type:** `string | undefined`

**Description:**
柱状图颜色

柱状图颜色

---

### lineColorOpacity

**Type:** `number | undefined`

**Description:**
柱状图颜色透明度

柱状图颜色透明度

---

### lineWidth

**Type:** `number | undefined`

**Description:**
柱状图边框宽度

柱状图边框宽度

---

### lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

**Description:**
柱状图边框样式

柱状图边框样式