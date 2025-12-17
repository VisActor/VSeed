# measures

**Type:** `MeasureTree | undefined`

:::note{title=描述}
表格的每个指标会对应一行, 并且天生支持指标组合.

:::

**示例**
[{id: "value", alias: "数值"}]




## id

**Type:** `string`

:::note{title=描述}
指标组id, 不能重复

:::

## alias

**Type:** `string | undefined`

:::note{title=描述}
指标组别名, 允许重复, 未填写时, alias 为 id

:::

## children

**Type:** `(TableMeasure | MeasureGroup)[] | undefined`

:::note{title=描述}
指标组的子指标或指标组

:::


