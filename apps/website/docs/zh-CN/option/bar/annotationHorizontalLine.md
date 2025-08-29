# annotationHorizontalLine

**Type:** `AnnotationHorizontalLine | AnnotationHorizontalLine[] | undefined`

:::note{title=描述}
标注水平线



标注水平线配置, 根据选择的数据, 定义图表的标注水平线, 包括标注水平线的位置, 样式等.:::


## selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
依赖选择的数据, 进行数据标记.:::


### field

**Type:** `string`

:::note{title=描述}
维度字段, dimensions 某一项的 id:::

### operator

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项:::

### op

**Type:** `"in" | "not in" | undefined`

:::note{title=描述}
操作符

\- in: 选择数据项中维度字段的值在 value 中的数据项

\- not in: 选择数据项中维度字段的值不在 value 中的数据项

same as operator:::

### value

**Type:** `string | number | (string | number)[]`

:::note{title=描述}
选择数据项中维度字段的值, 支持数组:::

## yValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=描述}
固定的y值, 用于标注水平线, 类目轴在y方向, 则可输入维值, 数值轴在y方向, 则可输入具体的数值:::

## text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本:::

**示例**
'标注文本'


## textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=描述}
文本位置



标注线的标签位置（标签相对线的相对位置）。:::

**示例**
'outsideEnd'


## textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色:::

**示例**
'red'


## textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小:::

**示例**
12


## textFontWeight

**Type:** `number | undefined`

:::note{title=描述}
文本字体重量:::

**示例**
400


## textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=描述}
文本对齐方式, 一般情况下, 无需设置

建议设置为'right', 这样可以确保文本在标注线的左侧

right: 文本在参考线的左侧, 文本的右侧边缘对齐(水平)标注线的终点

left: 文本在参考线的右侧, 文本的左侧边缘对齐(水平)标注线的终点

center: 文本在参考线的中心, 文本的中心对齐(水平)标注线的终点:::

**示例**
'right'


## textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 无需设置

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在参考线的底部, 文本的顶部边缘对齐(水平)标注线

middle: 文本在参考线的中心, 文本的中心对齐(水平)标注线

bottom: 文本在参考线的顶部, 文本的底部边缘对齐(水平)标注线:::

**示例**
'top'


## textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=描述}
背景可见:::

**示例**
true


## textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
背景颜色:::

**示例**
'red'


## textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=描述}
背景边框颜色:::

**示例**
'red'


## textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
背景边框宽度



背景边框宽度:::

**示例**
2


## textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
背景边框圆角:::

**示例**
4


## textBackgroundPadding

**Type:** `number | undefined`

:::note{title=描述}
背景内边距:::

**示例**
4


## lineVisible

**Type:** `boolean | undefined`

:::note{title=描述}
线可见



线可见:::

**示例**
true


## lineColor

**Type:** `string | undefined`

:::note{title=描述}
线颜色:::

**示例**
'red'


## lineWidth

**Type:** `number | undefined`

:::note{title=描述}
线宽度:::

**示例**
2


## lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
线样式:::

**示例**
'solid'


