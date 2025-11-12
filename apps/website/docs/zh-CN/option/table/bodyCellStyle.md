# bodyCellStyle

**Type:** `BodyCellStyle | BodyCellStyle[] | undefined`

:::note{title=描述}
设置表格正文部分单元格的特殊样式

:::


## selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
数据选择器



若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力

若未配置selector, 则样式全局生效.

:::

**示例**
数值选择器
selector = "tool"
selector = ["tool", "book"]
selector = 100
selector = [100, 200]

局部数据选择器
selector = { profit: 100 }
selector = [{ profit: 100 }, { profit: 200 }]

条件维度选择器
selector = {
field: 'category',
operator: 'in',
value: 'tool'
}
selector = {
field: 'category',
operator: 'not in',
value: 'book'
}

条件指标选择器
selector = {
field: 'profit',
operator: '>=',
value: 100
}
selector = {
field: 'profit',
operator: 'between'
value: [100, 300]
}




### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id

:::

### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

:::

### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator

:::

### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组

:::

## backgroundColor

**Type:** `string | undefined`

:::note{title=描述}
单元格背景色

:::

## textColor

**Type:** `string | undefined`

:::note{title=描述}
单元格文字颜色

:::

## textFontSize

**Type:** `number | undefined`

:::note{title=描述}
单元格文字大小

:::

## borderColor

**Type:** `string | undefined`

:::note{title=描述}
单元格边框颜色

:::

## borderLineWidth

**Type:** `number | undefined`

:::note{title=描述}
单元格边框线宽

:::

