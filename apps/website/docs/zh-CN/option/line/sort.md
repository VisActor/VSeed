# sort
## 描述
X轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序


## 属性·

### order

**类型:** `"asc" | "desc" | undefined`

**描述:**
排序顺序, 可选值为 'asc' 或 'desc'

---

### orderBy

**类型:** `string | undefined`

**描述:**
排序依赖的字段, 可以是维度id或指标id

---

### customOrder

**类型:** `string[] | undefined`

**描述:**
自定义排序顺序, 该顺序将直接应用至类目轴