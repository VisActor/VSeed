# legend

**Type:** `Legend | undefined`

:::note{title=描述}
图例



图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.

:::


## enable

**Type:** `boolean | undefined`

:::note{title=描述}
图例功能是否开启

:::

**示例**
enable: true



## border

**Type:** `boolean | undefined`

:::note{title=描述}
图例边框是否开启

:::

**示例**
border: true



:::warning{title=Warning}
仅离散图例生效

:::

## labelColor

**Type:** `string | undefined`

:::note{title=描述}
图例字体颜色

:::

## pagerIconColor

**Type:** `string | undefined`

:::note{title=描述}
分页器icon颜色

:::

## pagerIconDisableColor

**Type:** `string | undefined`

:::note{title=描述}
分页器icon置灰颜色

:::

## labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
图例字体大小

:::

**示例**
labelFontSize: 10



## labelFontColor

**Type:** `string | undefined`

:::note{title=描述}
图例字体颜色

:::

## labelFontWeight

**Type:** `string | number | undefined`

:::note{title=描述}
图例字体粗细

:::

**示例**
labelFontWeight: 400



## shapeType

**Type:** `"circle" | "cross" | "diamond" | "square" | "arrow" | "arrow2Left" | "arrow2Right" | "wedge" | "thinTriangle" | "triangle" | "triangleUp" | "triangleDown" | "triangleRight" | "triangleLeft" | "stroke" | "star" | "wye" | "rect" | "arrowLeft" | "arrowRight" | "rectRound" | "roundLine" | undefined`

:::note{title=描述}
图例形状

:::

**示例**
shapeType: 'circle'



:::warning{title=Warning}
仅离散图例生效

:::

## position

**Type:** `"left" | "leftTop" | "leftBottom" | "lt" | "lb" | "top" | "topLeft" | "topRight" | "tl" | "tr" | "right" | "rightTop" | "rightBottom" | "rt" | "rb" | "bottom" | "bottomLeft" | "bottomRight" | "bl" | "br" | undefined`

:::note{title=描述}
图例位置

:::

**示例**
position: 'rightTop'



## maxSize

**Type:** `number | undefined`

:::note{title=描述}
存在大量图例时, 最大列数 或 图例最大行数

如果position为水平方向(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize控制显示的列数

如果position为垂直方向(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize控制显示的行数

:::

**示例**
maxSize: 2



:::warning{title=Warning}
仅离散图例生效

:::

