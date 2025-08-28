# annotationVerticalLine

**Type:** `AnnotationVerticalLine | AnnotationVerticalLine[] | undefined`

**Description:**
标注垂直线
  
  标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.


## selector

**Type:** `Selector | Selectors | undefined`

**Description:**
依赖选择的数据, 进行数据标记.


### field

**Type:** `string`

**Description:**
No description

### operator

**Type:** `"in" | "not in" | undefined`

**Description:**
No description

### op

**Type:** `"in" | "not in" | undefined`

**Description:**
No description

### value

**Type:** `string | number | (string | number)[]`

**Description:**
No description

## xValue

**Type:** `string | number | (string | number)[] | undefined`

**Description:**
固定的x值, 用于标注垂直线, 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值

## text

**Type:** `string | string[] | undefined`

**Description:**
标注的文本

## textPosition

**Type:** `"outsideStart" | "outsideEnd" | "outsideMiddle" | "insideStart" | "insideMiddle" | "insideEnd" | undefined`

**Description:**
文本位置, 标注线的标签位置（标签相对线的相对位置）。

## textColor

**Type:** `string | undefined`

**Description:**
文本颜色

## textFontSize

**Type:** `number | undefined`

**Description:**
文本字体大小

## textFontWeight

**Type:** `number | undefined`

**Description:**
文本字体重量

## textAlign

**Type:** `"left" | "right" | "center" | undefined`

**Description:**
文本对齐方式, 一般情况下, 无需设置
  建议设置为'right', 这样可以确保文本在标注线的左侧
  right: 文本在参考线的左侧, 文本的右侧边缘对齐(垂直)标注线
  left: 文本在参考线的右侧, 文本的左侧边缘对齐(垂直)标注线
  center: 文本在参考线的中心, 文本的中心对齐(垂直)标注线

## textBaseline

**Type:** `"top" | "bottom" | "middle" | undefined`

**Description:**
文本垂直对齐方式, 一般情况下, 无需设置
  建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
  top: 文本在参考线的底部, 文本的顶部边缘对齐(垂直)标注线的终点
  middle: 文本在参考线的中心, 文本的中心对齐(垂直)标注线的终点
  bottom: 文本在参考线的顶部, 文本的底部边缘对齐(垂直)标注线的终点

## lineVisible

**Type:** `boolean | undefined`

**Description:**
线可见

## lineColor

**Type:** `string | undefined`

**Description:**
线颜色

## lineWidth

**Type:** `number | undefined`

**Description:**
线宽度

## lineStyle

**Type:** `"solid" | "dashed" | "dotted" | undefined`

**Description:**
线样式

## textBackgroundVisible

**Type:** `boolean | undefined`

**Description:**
背景可见

## textBackgroundColor

**Type:** `string | undefined`

**Description:**
背景颜色

## textBackgroundBorderColor

**Type:** `string | undefined`

**Description:**
背景边框颜色

## textBackgroundBorderWidth

**Type:** `number | undefined`

**Description:**
背景边框宽度

## textBackgroundBorderRadius

**Type:** `number | undefined`

**Description:**
背景边框圆角

## textBackgroundPadding

**Type:** `number | undefined`

**Description:**
背景内边距

