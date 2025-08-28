# sortLegend

**Type:** `SortLegend | undefined`

**描述:**
图例排序配置, 支持根据维度或指标排序, 以及自定义排序顺序

**示例:**
sortLegend: {
    orderBy: 'profit',
    order: 'asc',
  }
  sortLegend: {
    customOrder:['2019', '2020', '2021']
  }


## order

**Type:** `"asc" | "desc" | undefined`

**描述:**
排序顺序, 可选值为 'asc' 或 'desc'

**示例:**
order:'asc'

## orderBy

**Type:** `string | undefined`

**描述:**
排序依赖的字段, 可以是维度id或指标id

**示例:**
- orderBy:'date'
  - orderBy:'profit'

## customOrder

**Type:** `string[] | undefined`

**描述:**
自定义排序顺序, 该顺序将直接应用至图例, 升序从左到右或从上到下, 降序从右到左或从下到上

