# secondaryYAxis

**Type:** `YLinearAxis | YLinearAxis[] | undefined`

**描述:**
双轴图的次Y轴配置, 用于定义双轴图的次Y轴, 包括次Y轴的位置, 样式等. 当measures有多组时, secondaryYAxis可以配置为数组, 每项对应一个双轴图的次Y轴.

**示例:**
无示例


## min

**Type:** `number | undefined`

**描述:**
轴的最小值
  
  优先级高于 nice 与 zero

**示例:**
100

## max

**Type:** `number | undefined`

**描述:**
轴的最大值
  
  优先级高于 nice 与 zero

**示例:**
10000

## nice

**Type:** `boolean | undefined`

**描述:**
是否自动调整轴的刻度间隔，使刻度标签更易读
  
  当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

**示例:**
true

## zero

**Type:** `boolean | undefined`

**描述:**
是否在坐标轴上强制显示 0 值,
  
  当配置了 min 和 max, 该配置项失效, 仅对数值轴生效

**示例:**
true

## log

**Type:** `boolean | undefined`

**描述:**
是否使用对数轴, 仅对数值轴生效

**示例:**
无示例

## logBase

**Type:** `number | undefined`

**描述:**
对数轴的底数, 仅对数值轴生效

**示例:**
无示例

## visible

**Type:** `boolean | undefined`

**描述:**
轴是否可见

**示例:**
true

## inverse

**Type:** `boolean | undefined`

**描述:**
轴是否反向展示
  
  仅对数值轴生效

**示例:**
false

## label

**Type:** `{ visible?: boolean; labelColor?: string; labelFontSize?: number; labelFontWeight?: number; labelAngle?: number; } | undefined`

**描述:**
X轴刻度标签

**示例:**
无示例


### visible

**Type:** `boolean | undefined`

**描述:**
标签是否可见

**示例:**
无示例

### labelColor

**Type:** `string | undefined`

**描述:**
标签颜色

**示例:**
无示例

### labelFontSize

**Type:** `number | undefined`

**描述:**
标签字体大小

**示例:**
无示例

### labelFontWeight

**Type:** `number | undefined`

**描述:**
标签字体粗细

**示例:**
无示例

### labelAngle

**Type:** `number | undefined`

**描述:**
标签旋转角度

**示例:**
无示例

## line

**Type:** `{ visible?: boolean; lineColor?: string; lineWidth?: number; } | undefined`

**描述:**
X轴线

**示例:**
{
    visible: true,
    lineColor: '#ffeecc',
    lineWidth: 2,
  }


### visible

**Type:** `boolean | undefined`

**描述:**
轴线是否可见

**示例:**
无示例

### lineColor

**Type:** `string | undefined`

**描述:**
轴线颜色

**示例:**
无示例

### lineWidth

**Type:** `number | undefined`

**描述:**
轴线宽度

**示例:**
无示例

## tick

**Type:** `{ visible?: boolean; tickInside?: boolean; tickColor?: string; tickSize?: number; } | undefined`

**描述:**
X轴刻度

**示例:**
无示例


### visible

**Type:** `boolean | undefined`

**描述:**
刻度是否可见

**示例:**
无示例

### tickInside

**Type:** `boolean | undefined`

**描述:**
刻度是否朝内

**示例:**
无示例

### tickColor

**Type:** `string | undefined`

**描述:**
刻度颜色

**示例:**
无示例

### tickSize

**Type:** `number | undefined`

**描述:**
刻度尺寸

**示例:**
无示例

## title

**Type:** `{ visible?: boolean; titleText?: string; titleColor?: string; titleFontSize?: number; titleFontWeight?: number; } | undefined`

**描述:**
X轴标题

**示例:**
无示例


### visible

**Type:** `boolean | undefined`

**描述:**
标题是否可见

**示例:**
无示例

### titleText

**Type:** `string | undefined`

**描述:**
标题文本, 默认跟随字段配置

**示例:**
无示例

### titleColor

**Type:** `string | undefined`

**描述:**
标题颜色

**示例:**
无示例

### titleFontSize

**Type:** `number | undefined`

**描述:**
标题字体大小

**示例:**
无示例

### titleFontWeight

**Type:** `number | undefined`

**描述:**
标题字体粗细

**示例:**
无示例

## grid

**Type:** `{ visible?: boolean; gridColor?: string; gridWidth?: number; } | undefined`

**描述:**
X轴网格线

**示例:**
无示例


### visible

**Type:** `boolean | undefined`

**描述:**
No description

**示例:**
无示例

### gridColor

**Type:** `string | undefined`

**描述:**
网格线颜色

**示例:**
无示例

### gridWidth

**Type:** `number | undefined`

**描述:**
网格线宽度

**示例:**
无示例

