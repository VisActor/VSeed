# xAxis

**Type:** `XBandAxis | undefined`

**描述:**
x轴
  
  类目轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.

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

## labelAutoHide

**Type:** `boolean | undefined`

**描述:**
轴标签, 自动隐藏
  
  2个标签若重叠(间隔小于autoHideGap), 则自动隐藏导致重叠的标签. 仅对类目轴生效.

**示例:**
无示例

## labelAutoHideGap

**Type:** `number | undefined`

**描述:**
轴标签, 自动隐藏间隔
  
  若2个文本标签的间隔小于autoHideGap, 则自动隐藏导致重叠的标签. 仅对类目轴生效.
  autoHide开启时, 使用autoHide, 设置在autoHideSeparation上
  autoHide关闭时, 使用sampling采样, 设置在minGap上

**示例:**
无示例

## labelAutoRotate

**Type:** `boolean | undefined`

**描述:**
轴标签, 自动旋转
  
  当标签宽度超过轴长度时, 自动旋转标签. 仅对类目轴生效.

**示例:**
无示例

## labelAutoRotateAngleRange

**Type:** `number[] | undefined`

**描述:**
轴标签, 自动旋转角度范围
  
  当自动旋转开启时, 标签旋转角度范围. 仅对类目轴生效.

**示例:**
无示例

## labelAutoLimit

**Type:** `boolean | undefined`

**描述:**
轴标签, 自动限制长度,
  
  当标签宽度超过轴长度时, 超出部分省略号表示, 鼠标悬浮后可见标签, 自动限制标签宽度. 仅对类目轴生效.

**示例:**
无示例

## labelAutoLimitLength

**Type:** `number | undefined`

**描述:**
轴标签, 自动限制长度的最大长度
  
  当标签文本长度超过最大长度时, 超出部分省略号表示, 鼠标悬浮后可见标签. 仅对类目轴生效.

**示例:**
无示例

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

