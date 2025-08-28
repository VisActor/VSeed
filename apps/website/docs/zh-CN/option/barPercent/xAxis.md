# xAxis
## 描述
x轴

数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.


## Properties

### min

**Type:** `number | undefined`

**Description:**
轴的最小值

优先级高于 nice 与 zero

---

### max

**Type:** `number | undefined`

**Description:**
轴的最大值

优先级高于 nice 与 zero

---

### nice

**Type:** `boolean | undefined`

**Description:**
是否自动调整轴的刻度间隔，使刻度标签更易读

当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

---

### zero

**Type:** `boolean | undefined`

**Description:**
是否在坐标轴上强制显示 0 值,

当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

---

### log

**Type:** `boolean | undefined`

**Description:**
是否使用对数轴, 仅对数值轴生效

---

### logBase

**Type:** `number | undefined`

**Description:**
对数轴的底数, 仅对数值轴生效

---

### visible

**Type:** `boolean | undefined`

**Description:**
轴是否可见

---

### inverse

**Type:** `boolean | undefined`

**Description:**
轴是否反向展示

仅对数值轴生效