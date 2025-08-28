# barStyle

**Type:** `BarStyle | BarStyle[] | undefined`

**Description:**
矩形图元样式
  
  条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
  支持全局样式或条件样式配置
  数据筛选器
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.

---


## selector

**Type:** `Selector | Selectors | undefined`

**Description:**
数据选择器
  
  若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
  若未配置selector, 则样式全局生效.

---


### field

**Type:** `string`

**Description:**
No description

---

### operator

**Type:** `"in" | "not in" | undefined`

**Description:**
No description

---

### op

**Type:** `"in" | "not in" | undefined`

**Description:**
No description

---

### value

**Type:** `string | number | (string | number)[]`

**Description:**
No description

---

## barColor

**Type:** `string | undefined`

**Description:**
柱状图颜色
  
  柱状图颜色

---

## barColorOpacity

**Type:** `number | undefined`

**Description:**
柱状图颜色透明度
  
  柱状图颜色透明度

---

## barBorderColor

**Type:** `string | undefined`

**Description:**
柱状图边框颜色
  
  柱状图边框颜色

---

## barBorderWidth

**Type:** `number | undefined`

**Description:**
柱状图边框宽度
  
  柱状图边框宽度

---

## barBorderStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

**Description:**
柱状图边框样式
  
  柱状图边框样式

---

## barRadius

**Type:** `number | number[] | undefined`

**Description:**
柱状图圆角
  
  柱状图圆角

---

