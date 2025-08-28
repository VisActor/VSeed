# xAxis
## 描述
x轴

数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.


## 属性

### min

**类型:** `number | undefined`

**描述:**
轴的最小值

优先级高于 nice 与 zero

---

### max

**类型:** `number | undefined`

**描述:**
轴的最大值

优先级高于 nice 与 zero

---

### nice

**类型:** `boolean | undefined`

**描述:**
是否自动调整轴的刻度间隔，使刻度标签更易读

当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

---

### zero

**类型:** `boolean | undefined`

**描述:**
是否在坐标轴上强制显示 0 值,

当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

---

### log

**类型:** `boolean | undefined`

**描述:**
是否使用对数轴, 仅对数值轴生效

---

### logBase

**类型:** `number | undefined`

**描述:**
对数轴的底数, 仅对数值轴生效

---

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