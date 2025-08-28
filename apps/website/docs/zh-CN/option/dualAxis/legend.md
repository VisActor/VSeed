# legend
## 描述
图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.


## 属性

### enable

**类型:** `boolean | undefined`

**描述:**
图例功能是否开启

---

### border

**类型:** `boolean | undefined`

**描述:**
图例边框是否开启

---

### labelFontSize

**类型:** `number | undefined`

**描述:**
图例字体大小

---

### labelFontColor

**类型:** `string | undefined`

**描述:**
图例字体颜色

---

### labelFontWeight

**类型:** `string | number | undefined`

**描述:**
图例字体粗细

---

### shapeType

**类型:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

**描述:**
图例形状

---

### position

**类型:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

**描述:**
图例位置

---

### maxSize

**类型:** `number | undefined`

**描述:**
存在大量图例时, 最大列数 或 图例最大行数
如果position为水平方向(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize控制显示的列数
如果position为垂直方向(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize控制显示的行数