# yAxis

**Type:** `import("/Users/bytedance/Projects/VSeed/packages/vseed/src/index").XBandAxis | undefined`

:::note{title=描述}
y轴, 类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.

:::


## visible

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否可见

:::

## inverse

**Type:** `boolean | undefined`

:::note{title=描述}
轴是否反向展示, 仅对数值轴生效

:::

## zero

**Type:** `boolean | undefined`

:::note{title=描述}
是否在坐标轴上强制显示 0 值, 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

:::

## labelAutoHide

**Type:** `boolean | undefined`

:::note{title=描述}
轴标签, 自动隐藏, 2个标签若重叠(间隔小于autoHideGap), 则自动隐藏导致重叠的标签. 仅对类目轴生效.

:::

## labelAutoHideGap

**Type:** `number | undefined`

:::note{title=描述}
轴标签, 自动隐藏间隔, 若2个文本标签的间隔小于autoHideGap, 则自动隐藏导致重叠的标签. 仅对类目轴生效.

autoHide开启时, 使用autoHide, 设置在autoHideSeparation上

autoHide关闭时, 使用sampling采样, 设置在minGap上

:::

## labelAutoRotate

**Type:** `boolean | undefined`

:::note{title=描述}
轴标签, 自动旋转, 当标签宽度超过轴长度时, 自动旋转标签. 仅对类目轴生效.

:::

## labelAutoRotateAngleRange

**Type:** `number[] | undefined`

:::note{title=描述}
轴标签, 自动旋转角度范围, 当自动旋转开启时, 标签旋转角度范围. 仅对类目轴生效.

:::

## labelAutoLimit

**Type:** `boolean | undefined`

:::note{title=描述}
轴标签, 自动限制长度, 当标签宽度超过轴长度时, 超出部分省略号表示, 鼠标悬浮后可见标签, 自动限制标签宽度. 仅对类目轴生效.

:::

## labelAutoLimitLength

**Type:** `number | undefined`

:::note{title=描述}
轴标签, 自动限制长度的最大长度, 当标签文本长度超过最大长度时, 超出部分省略号表示, 鼠标悬浮后可见标签. 仅对类目轴生效.

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

## line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

:::note{title=描述}
X轴线

:::


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

