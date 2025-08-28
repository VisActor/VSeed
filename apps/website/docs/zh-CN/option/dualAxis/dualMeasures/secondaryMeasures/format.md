# format
## 描述
指标的数值格式化, 会自动应用于label、tooltip


## Properties

### type

**Type:** `"number" | "percent" | "permille" | "scientific" | undefined`

**Description:**
数字格式化类型, 支持数值(十进制)、百分比(%)、千分比(‰)、科学计数法

---

### ratio

**Type:** `number | undefined`

**Description:**
数值格式化比例, 百分比和千分比需要设置比例

---

### symbol

**Type:** `string | undefined`

**Description:**
数值格式化符号, 例如%、‰

---

### thousandSeparator

**Type:** `boolean | undefined`

**Description:**
数值格式化千分位分隔符

---

### suffix

**Type:** `string | undefined`

**Description:**
数值格式化后缀

---

### prefix

**Type:** `string | undefined`

**Description:**
数值格式化前缀

---

### fractionDigits

**Type:** `number | undefined`

**Description:**
数值格式化小数位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumFractionDigits 和 maximumFractionDigits 进行格式化, 优先级低于 significantDigits

---

### significantDigits

**Type:** `number | undefined`

**Description:**
数值格式化有效位, 使用浏览器提供的 Intl.NumberFormat 中的 minimumSignificantDigits 和 maximumSignificantDigits 进行格式化, 优先级高于 fractionDigits

---

### roundingPriority

**Type:** `"morePrecision" | "lessPrecision" | undefined`

**Description:**
数值格式化舍入优先级, 处理同时设置了 significantDigits 和 fractionDigits 时的舍入优先级, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingPriority

---

### roundingMode

**Type:** `"floor" | "ceil" | "expand" | "trunc" | "halfCeil" | "halfFloor" | "halfExpand" | "halfTrunc" | "halfEven" | undefined`

**Description:**
数值格式化舍入模式, 使用浏览器提供的 Intl.NumberFormat 进行格式化, 规则同 Intl.NumberFormat 中的 roundingMode