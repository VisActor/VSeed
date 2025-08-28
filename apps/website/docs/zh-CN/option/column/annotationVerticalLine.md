# annotationVerticalLine
## 描述
标注垂直线

标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.


## 属性·

### xValue

**类型:** `string | number | (string | number)[] | undefined`

**描述:**
固定的x值, 用于标注垂直线, 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值

---

### text

**类型:** `string | string[] | undefined`

**描述:**
标注的文本

---

### textPosition

**类型:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

**描述:**
文本位置, 标注线的标签位置（标签相对线的相对位置）。

---

### textColor

**类型:** `string | undefined`

**描述:**
文本颜色

---

### textFontSize

**类型:** `number | undefined`

**描述:**
文本字体大小

---

### textFontWeight

**类型:** `number | undefined`

**描述:**
文本字体重量

---

### textAlign

**类型:** `"left" | "right" | "center" | undefined`

**描述:**
文本对齐方式, 一般情况下, 无需设置
建议设置为'right', 这样可以确保文本在标注线的左侧
right: 文本在参考线的左侧, 文本的右侧边缘对齐(垂直)标注线
left: 文本在参考线的右侧, 文本的左侧边缘对齐(垂直)标注线
center: 文本在参考线的中心, 文本的中心对齐(垂直)标注线

---

### textBaseline

**类型:** `"top" | "bottom" | "middle" | undefined`

**描述:**
文本垂直对齐方式, 一般情况下, 无需设置
建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
top: 文本在参考线的底部, 文本的顶部边缘对齐(垂直)标注线的终点
middle: 文本在参考线的中心, 文本的中心对齐(垂直)标注线的终点
bottom: 文本在参考线的顶部, 文本的底部边缘对齐(垂直)标注线的终点

---

### lineVisible

**类型:** `boolean | undefined`

**描述:**
线可见

---

### lineColor

**类型:** `string | undefined`

**描述:**
线颜色

---

### lineWidth

**类型:** `number | undefined`

**描述:**
线宽度

---

### lineStyle

**类型:** `"solid" | "dashed" | "dotted" | undefined`

**描述:**
线样式

---

### textBackgroundVisible

**类型:** `boolean | undefined`

**描述:**
背景可见

---

### textBackgroundColor

**类型:** `string | undefined`

**描述:**
背景颜色

---

### textBackgroundBorderColor

**类型:** `string | undefined`

**描述:**
背景边框颜色

---

### textBackgroundBorderWidth

**类型:** `number | undefined`

**描述:**
背景边框宽度

---

### textBackgroundBorderRadius

**类型:** `number | undefined`

**描述:**
背景边框圆角

---

### textBackgroundPadding

**类型:** `number | undefined`

**描述:**
背景内边距