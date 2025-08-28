# annotationArea
## 描述
标注区域

标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.


## Properties

### text

**Type:** `string | string[] | undefined`

**Description:**
标注的文本

---

### textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

**Description:**
文本位置

---

### textColor

**Type:** `string | undefined`

**Description:**
文本颜色

---

### textFontSize

**Type:** `number | undefined`

**Description:**
文本字体大小

---

### textFontWeight

**Type:** `number | undefined`

**Description:**
文本字体重量

---

### textAlign

**Type:** `"left" | "right" | "center" | undefined`

**Description:**
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注面中间, 确保显示在图表的可见区域
建议设置为'center', 这样可以确保文本在标注面的中间
right: 文本在标注面的左侧, 文本的右侧边缘对齐标注面
left: 文本在标注面的右侧, 文本的左侧边缘对齐标注面
center: 文本在标注面的中心, 文本的中心对齐标注面

---

### textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

**Description:**
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注面底部, 确保显示在图表的可见区域
建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
top: 文本在标注面的底部, 文本的顶部边缘对齐标注面
middle: 文本在标注面的中心, 文本的中心对齐标注面
bottom: 文本在标注面的顶部, 文本的底部边缘对齐标注面

---

### textBackgroundVisible

**Type:** `boolean | undefined`

**Description:**
背景可见

---

### textBackgroundColor

**Type:** `string | undefined`

**Description:**
背景颜色

---

### textBackgroundBorderColor

**Type:** `string | undefined`

**Description:**
背景边框颜色

背景边框颜色

---

### textBackgroundBorderWidth

**Type:** `number | undefined`

**Description:**
背景边框宽度

---

### textBackgroundBorderRadius

**Type:** `number | undefined`

**Description:**
背景边框圆角

背景边框圆角

---

### textBackgroundPadding

**Type:** `number | undefined`

**Description:**
背景内边距

---

### areaColor

**Type:** `string | undefined`

**Description:**
标注面区域颜色

---

### areaColorOpacity

**Type:** `number | undefined`

**Description:**
标注面区域颜色透明度

---

### areaBorderColor

**Type:** `number | undefined`

**Description:**
标注面区域边框颜色

---

### areaBorderWidth

**Type:** `number | undefined`

**Description:**
标注面区域边框宽度

---

### areaBorderRadius

**Type:** `number | undefined`

**Description:**
标注面区域边框圆角

---

### outerPadding

**Type:** `number | undefined`

**Description:**
标注面区域的边距