# primaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

:::note{title=描述}
双轴图的主Y轴配置, 用于定义双轴图的主Y轴, 包括主Y轴的位置, 样式等. 当measures有多组时, primaryYAxis可以配置为数组, 每项对应一个双轴图的主Y轴.

:::


## label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

:::note{title=描述}
X轴刻度标签

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标签是否可见

:::

### labelColor

**Type:** `string | undefined`

:::note{title=描述}
标签颜色

:::

### labelFontSize

**Type:** `number | undefined`

:::note{title=描述}
标签字体大小

:::

### labelFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标签字体粗细

:::

### labelAngle

**Type:** `number | undefined`

:::note{title=描述}
标签旋转角度

:::

## min

**Type:** `number | undefined`

:::note{title=描述}
轴的最小值



优先级高于 nice 与 zero

:::

**示例**
100



## max

**Type:** `number | undefined`

:::note{title=描述}
轴的最大值



优先级高于 nice 与 zero

:::

**示例**
10000



## nice

**Type:** `boolean | undefined`

:::note{title=描述}
是否自动调整轴的刻度间隔，使刻度标签更易读



当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

**示例**
true



## zero

**Type:** `boolean | undefined`

:::note{title=描述}
是否在坐标轴上强制显示 0 值,



当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

**示例**
true



## log

**Type:** `boolean | undefined`

:::note{title=描述}
是否使用对数轴, 仅对数值轴生效

:::

## logBase

**Type:** `number | undefined`

:::note{title=描述}
对数轴的底数, 仅对数值轴生效

:::

## visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否可见

:::

**示例**
true



## inverse

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否反向展示



仅对数值轴生效

:::

**示例**
false



## line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
X轴线

:::

**示例**
{
  visible: true,
  lineColor: '#ffeecc',
  lineWidth: 2,
}




### visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴线是否可见

:::

### lineColor

**Type:** `string | undefined`

:::note{title=描述}
轴线颜色

:::

### lineWidth

**Type:** `number | undefined`

:::note{title=描述}
轴线宽度

:::

## tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

:::note{title=描述}
X轴刻度

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否可见

:::

### tickInside

**Type:** `boolean | undefined`

:::note{title=描述}
刻度是否朝内

:::

### tickColor

**Type:** `string | undefined`

:::note{title=描述}
刻度颜色

:::

### tickSize

**Type:** `number | undefined`

:::note{title=描述}
刻度尺寸

:::

## title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

:::note{title=描述}
X轴标题

:::


### visible

**Type:** `boolean | undefined`

:::note{title=描述}
标题是否可见

:::

### titleText

**Type:** `string | undefined`

:::note{title=描述}
标题文本, 默认跟随字段配置

:::

### titleColor

**Type:** `string | undefined`

:::note{title=描述}
标题颜色

:::

### titleFontSize

**Type:** `number | undefined`

:::note{title=描述}
标题字体大小

:::

### titleFontWeight

**Type:** `number | undefined`

:::note{title=描述}
标题字体粗细

:::

## grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; } | undefined`

:::note{title=描述}
X轴网格线

:::


### visible

**Type:** `boolean | undefined`

### gridColor

**Type:** `string | undefined`

:::note{title=描述}
网格线颜色

:::

### gridWidth

**Type:** `number | undefined`

:::note{title=描述}
网格线宽度

:::

