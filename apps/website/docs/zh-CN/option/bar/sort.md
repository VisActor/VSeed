# sort

**Type:** `Sort | undefined`

**Description:**
Y轴排序配置, 支持根据维度或指标排序, 以及自定义排序顺序


## order

**Type:** `"asc" | "desc" | undefined`

**Description:**
排序顺序, 可选值为 'asc' 或 'desc'

## orderBy

**Type:** `string | undefined`

**Description:**
排序依赖的字段, 可以是维度id或指标id

## customOrder

**Type:** `string[] | undefined`

**Description:**
自定义排序顺序, 该顺序将直接应用至类目轴

