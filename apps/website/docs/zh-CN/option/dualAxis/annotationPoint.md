# annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

**Description:**
标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.

---


## selector

**Type:** `Selector | Selectors`

**Description:**
标注点的选择器, 用于选择数据点.

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

## text

**Type:** `string | string[] | undefined`

**Description:**
标注的文本

---

## textColor

**Type:** `string | undefined`

**Description:**
文本颜色

---

## textFontSize

**Type:** `number | undefined`

**Description:**
文本字体大小

---

## textFontWeight

**Type:** `number | undefined`

**Description:**
文本字体重量

---

## textAlign

**Type:** `"left" | "right" | "center" | undefined`

**Description:**
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注点左侧, 确保显示在图表的可见区域
  建议设置为'right', 这样可以确保文本在标注点的左侧
  right: 文本在标注点的左侧, 文本的右侧边缘对齐标注点
  left: 文本在标注点的右侧, 文本的左侧边缘对齐标注点
  center: 文本在标注点的中心, 文本的中心对齐标注点

---

## textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

**Description:**
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注点底部, 确保显示在图表的可见区域
  建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
  top: 文本在标注点的底部, 文本的顶部边缘对齐标注点
  middle: 文本在标注点的中心, 文本的中心对齐标注点
  bottom: 文本在标注点的顶部, 文本的底部边缘对齐标注点

---

## textBackgroundVisible

**Type:** `boolean | undefined`

**Description:**
背景可见

---

## textBackgroundColor

**Type:** `string | undefined`

**Description:**
背景颜色

---

## textBackgroundBorderColor

**Type:** `string | undefined`

**Description:**
背景边框颜色

---

## textBackgroundBorderWidth

**Type:** `number | undefined`

**Description:**
背景边框宽度

---

## textBackgroundBorderRadius

**Type:** `number | undefined`

**Description:**
背景边框圆角

---

## textBackgroundPadding

**Type:** `number | undefined`

**Description:**
背景内边距

---

## offsetY

**Type:** `number | undefined`

**Description:**
标注点整体在Y方向的偏移像素距离, 当标注点在图表上方(数值较大时)时, 建议设置为正值, 标注点在图表下方(数值较小时)时, 建议设置为负值.
  负值则整体向上偏移, 例如设置为-10, 则整个标注点组件包括文本、文本背景, 一起向上偏移10像素
  正值则整体向下偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向下偏移10像素

---

## offsetX

**Type:** `number | undefined`

**Description:**
标注点整体在X方向的偏移像素距离, 当标注点在图表左侧(类目轴起点)时, 建议设置为正值, 标注点在图表右侧(类目轴终点)时, 建议设置为负值.
  负值则整体向左偏移, 例如设置为-10, 则整个标注点组件包括文本、文本背景, 一起向左偏移10像素
  正值则整体向右偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向右偏移10像素

---

