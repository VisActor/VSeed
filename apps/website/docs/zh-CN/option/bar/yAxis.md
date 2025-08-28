# yAxis
## 描述
y轴

类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.


## 属性

### visible

**类型:** `boolean | undefined`

**描述:**
轴是否可见

---

### inverse

**类型:** `boolean | undefined`

**描述:**
轴是否反向展示

仅对数值轴生效

---

### labelAutoHide

**类型:** `boolean | undefined`

**描述:**
轴标签, 自动隐藏

2个标签若重叠(间隔小于autoHideGap), 则自动隐藏导致重叠的标签. 仅对类目轴生效.

---

### labelAutoHideGap

**类型:** `number | undefined`

**描述:**
轴标签, 自动隐藏间隔

若2个文本标签的间隔小于autoHideGap, 则自动隐藏导致重叠的标签. 仅对类目轴生效.
autoHide开启时, 使用autoHide, 设置在autoHideSeparation上
autoHide关闭时, 使用sampling采样, 设置在minGap上

---

### labelAutoRotate

**类型:** `boolean | undefined`

**描述:**
轴标签, 自动旋转

当标签宽度超过轴长度时, 自动旋转标签. 仅对类目轴生效.

---

### labelAutoRotateAngleRange

**类型:** `number[] | undefined`

**描述:**
轴标签, 自动旋转角度范围

当自动旋转开启时, 标签旋转角度范围. 仅对类目轴生效.

---

### labelAutoLimit

**类型:** `boolean | undefined`

**描述:**
轴标签, 自动限制长度,

当标签宽度超过轴长度时, 超出部分省略号表示, 鼠标悬浮后可见标签, 自动限制标签宽度. 仅对类目轴生效.

---

### labelAutoLimitLength

**类型:** `number | undefined`

**描述:**
轴标签, 自动限制长度的最大长度

当标签文本长度超过最大长度时, 超出部分省略号表示, 鼠标悬浮后可见标签. 仅对类目轴生效.