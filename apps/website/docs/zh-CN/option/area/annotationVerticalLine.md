# annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

:::note{title=描述}
维度值标注线，竖直方向展示，能够设置标注线的位置, 样式等

:::


## xValue

**Type:** `string | number | (string | number)[] | undefined`

:::note{title=描述}
固定的x值, 用于标注垂直线, 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值

:::

## text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本

:::

**示例**
'标注文本'



## textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

:::note{title=描述}
文本位置, 标注线的标签位置（标签相对线的相对位置）。

:::

**示例**
'outsideEnd'



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
文本对齐方式, 一般情况下, 无需设置

建议设置为'right', 这样可以确保文本在标注线的左侧

right: 文本在参考线的左侧, 文本的右侧边缘对齐(垂直)标注线

left: 文本在参考线的右侧, 文本的左侧边缘对齐(垂直)标注线

center: 文本在参考线的中心, 文本的中心对齐(垂直)标注线

:::

**示例**
'right'



## textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 无需设置

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在参考线的底部, 文本的顶部边缘对齐(垂直)标注线的终点

middle: 文本在参考线的中心, 文本的中心对齐(垂直)标注线的终点

bottom: 文本在参考线的顶部, 文本的底部边缘对齐(垂直)标注线的终点

:::

**示例**
'top'



## lineVisible

**Type:** `boolean | undefined`

:::note{title=描述}
线可见

:::

**示例**
true



## lineColor

**Type:** `string | undefined`

:::note{title=描述}
线颜色

:::

**示例**
'red'



## lineWidth

**Type:** `number | undefined`

:::note{title=描述}
线宽度

:::

**示例**
2



## lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

:::note{title=描述}
线样式

:::

**示例**
'solid'



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



