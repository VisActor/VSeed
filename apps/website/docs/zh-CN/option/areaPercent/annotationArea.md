# annotationArea

**Type:** `AnnotationArea | AnnotationArea[] | undefined`

:::note{title=描述}
标注区域



标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.

:::


## selector

**Type:** `Selector | Selectors | undefined`

:::note{title=描述}
依赖选择的数据, 进行数据标记.

:::


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

## text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本

:::

**示例**
'标注文本'



## textPosition

**Type:** `"left" | "top" | "topLeft" | "topRight" | "right" | "bottom" | "bottomLeft" | "bottomRight" | undefined`

:::note{title=描述}
文本位置

:::

**示例**
'top'



## textColor

**Type:** `string | undefined`

:::note{title=描述}
文本颜色

:::

**示例**
'red'



## textFontSize

**Type:** `number | undefined`

:::note{title=描述}
文本字体大小

:::

**示例**
12



## textFontWeight

**Type:** `number | undefined`

:::note{title=描述}
文本字体重量

:::

**示例**
400



## textAlign

**Type:** `"left" | "right" | "center" | undefined`

:::note{title=描述}
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注区域中间, 确保显示在图表的可见区域

建议设置为'center', 这样可以确保文本在标注区域的中间

right: 文本在标注区域的左侧, 文本的右侧边缘对齐标注区域

left: 文本在标注区域的右侧, 文本的左侧边缘对齐标注区域

center: 文本在标注区域的中心, 文本的中心对齐标注区域

:::

**示例**
'center' 文本在标注区域的中间



## textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注区域底部, 确保显示在图表的可见区域

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在标注区域的底部, 文本的顶部边缘对齐标注区域

middle: 文本在标注区域的中心, 文本的中心对齐标注区域

bottom: 文本在标注区域的顶部, 文本的底部边缘对齐标注区域

:::

**示例**
'top' 文本在标注区域的底部



## textBackgroundVisible

**Type:** `boolean | undefined`

:::note{title=描述}
背景可见

:::

**示例**
true



## textBackgroundColor

**Type:** `string | undefined`

:::note{title=描述}
背景颜色

:::

**示例**
'red'



## textBackgroundBorderColor

**Type:** `string | undefined`

:::note{title=描述}
背景边框颜色



背景边框颜色

:::

**示例**
'red'



## textBackgroundBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
背景边框宽度

:::

**示例**
2



## textBackgroundBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
背景边框圆角



背景边框圆角

:::

**示例**
4



## textBackgroundPadding

**Type:** `number | undefined`

:::note{title=描述}
背景内边距

:::

**示例**
4



## areaColor

**Type:** `string | undefined`

:::note{title=描述}
标注区域区域颜色

:::

**示例**
'red'



## areaColorOpacity

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域颜色透明度

:::

**示例**
0.5



## areaBorderColor

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域边框颜色

:::

**示例**
'red'



## areaBorderWidth

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域边框宽度

:::

**示例**
2



## areaBorderRadius

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域边框圆角

:::

**示例**
4



## outerPadding

**Type:** `number | undefined`

:::note{title=描述}
标注区域区域的边距

:::

**示例**
0



