# annotationPoint

**Type:** `AnnotationPoint | AnnotationPoint[] | undefined`

:::note{title=描述}
标注点



标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.:::


## selector

**Type:** `Selector | Selectors`

:::note{title=描述}
标注点的选择器, 用于选择数据点.:::


### field

**Type:** `string`

### operator

**Type:** `"in" | "not in" | undefined`

### op

**Type:** `"in" | "not in" | undefined`

### value

**Type:** `string | number | (string | number)[]`

## text

**Type:** `string | string[] | undefined`

:::note{title=描述}
标注的文本:::

**示例**
'标注文本'


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
文本对齐方式, 一般情况下, 设置为right, 文本显示在标注点左侧, 确保显示在图表的可见区域

建议设置为'right', 这样可以确保文本在标注点的左侧

right: 文本在标注点的左侧, 文本的右侧边缘对齐标注点

left: 文本在标注点的右侧, 文本的左侧边缘对齐标注点

center: 文本在标注点的中心, 文本的中心对齐标注点:::

**示例**
'right' 文本在标注点的左侧


## textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

:::note{title=描述}
文本垂直对齐方式, 一般情况下, 设置为top, 文本显示在标注点底部, 确保显示在图表的可见区域

建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域

top: 文本在标注点的底部, 文本的顶部边缘对齐标注点

middle: 文本在标注点的中心, 文本的中心对齐标注点

bottom: 文本在标注点的顶部, 文本的底部边缘对齐标注点:::

**示例**
'top' 文本在标注点的底部


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


## offsetY

**Type:** `number | undefined`

:::note{title=描述}
标注点整体在Y方向的偏移像素距离, 当标注点在图表上方(数值较大时)时, 建议设置为正值, 标注点在图表下方(数值较小时)时, 建议设置为负值.

负值则整体向上偏移, 例如设置为\-10, 则整个标注点组件包括文本、文本背景, 一起向上偏移10像素

正值则整体向下偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向下偏移10像素:::

**示例**
offsetY: 5, 标注点整体向下偏移5像素


## offsetX

**Type:** `number | undefined`

:::note{title=描述}
标注点整体在X方向的偏移像素距离, 当标注点在图表左侧(类目轴起点)时, 建议设置为正值, 标注点在图表右侧(类目轴终点)时, 建议设置为负值.

负值则整体向左偏移, 例如设置为\-10, 则整个标注点组件包括文本、文本背景, 一起向左偏移10像素

正值则整体向右偏移, 例如设置为10, 则整个标注点组件包括文本、文本背景, 一起向右偏移10像素:::

**示例**
offsetX: 5, 标注点整体向右偏移5像素


