# annotationArea
## 描述
标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.


## 属性·

### text

**类型:** `string | string[] | undefined`

**描述:**
标注的文本

---

### textPosition

**类型:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

**描述:**
文本位置

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
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注面中间, 确保显示在图表的可见区域
建议设置为'center', 这样可以确保文本在标注面的中间
right: 文本在标注面的左侧, 文本的右侧边缘对齐标注面
left: 文本在标注面的右侧, 文本的左侧边缘对齐标注面
center: 文本在标注面的中心, 文本的中心对齐标注面

---

### textBaseline

**类型:** `"top" | "bottom" | "middle" | undefined`

**描述:**
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注面底部, 确保显示在图表的可见区域
建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
top: 文本在标注面的底部, 文本的顶部边缘对齐标注面
middle: 文本在标注面的中心, 文本的中心对齐标注面
bottom: 文本在标注面的顶部, 文本的底部边缘对齐标注面

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

背景边框圆角

---

### textBackgroundPadding

**类型:** `number | undefined`

**描述:**
背景内边距

---

### areaColor

**类型:** `string | undefined`

**描述:**
标注面区域颜色

---

### areaColorOpacity

**类型:** `number | undefined`

**描述:**
标注面区域颜色透明度

---

### areaBorderColor

**类型:** `number | undefined`

**描述:**
标注面区域边框颜色

---

### areaBorderWidth

**类型:** `number | undefined`

**描述:**
标注面区域边框宽度

---

### areaBorderRadius

**类型:** `number | undefined`

**描述:**
标注面区域边框圆角

---

### outerPadding

**类型:** `number | undefined`

**描述:**
标注面区域的边距