# Bar 图表类型定义

`Bar` 组件用于渲染条形图。条形图适用于横向数据对比场景，Y轴为类目轴（分类数据），X轴为数值轴（连续数据），柱子横向排列。

## Bar

```typescript
export interface Bar {
  /**
   * 图表类型
   * @description 固定为 'bar'
   */
  chartType: 'bar';
  /**
   * 数据集
   * @description 定义图表的数据来源和结构。
   */
  dataset: Dataset;
  /**
   * 维度
   * @description 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   */
  dimensions?: Dimensions;
  /**
   * 指标
   * @description 条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   */
  measures?: Measures;
  /**
   * 图表的背景颜色
   * @description 支持颜色字符串、hex、rgb或rgba值。
   * @default 'transparent'
   */
  backgroundColor?: BackgroundColor;
  /**
   * 颜色配置
   * @description 定义图表的颜色方案, 包括颜色列表, 颜色映射等。
   */
  color?: Color;
  /**
   * 数据标签配置
   */
  label?: Label;
  /**
   * 图例配置
   */
  legend?: Legend;
  /**
   * 提示信息配置
   */
  tooltip?: Tooltip;
  /**
   * x轴配置 (数值轴)
   */
  xAxis?: XLinearAxis;
  /**
   * y轴配置 (类目轴)
   */
  yAxis?: YBandAxis;
  /**
   * 水平提示框配置
   */
  crosshairRect?: CrosshairRect;
  /**
   * 条形图堆叠圆角
   * @default 8
   */
  stackCornerRadius?: StackCornerRadius;
  /**
   * 图表主题
   * @description 内置 'light' 与 'dark' 两种主题。
   * @default 'light'
   */
  theme?: Theme;
  /**
   * 矩形图元样式
   * @description 定义条形图的样式，支持全局或按条件配置。
   */
  barStyle?: BarStyle | BarStyle[];
  /**
   * 标注点配置
   * @description 根据所选数据定义图表的标注点。
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[];
  /**
   * 标注垂直线
   * @description 标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[];
  /**
   * 标注水平线
   * @description 标注水平线配置, 根据选择的数据, 定义图表的标注水平线, 包括标注水平线的位置, 样式等.
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[];
  /**
   * 标注区域
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[];
  /**
   * 语言
   * @description 图表语言配置, 支持'zh-CN'与'en-US'两种语言
   * @default 'zh-CN'
   */
  locale?: 'zh-CN' | 'en-US';
}
```

---

### Dataset

`Dataset` 是一个对象数组，其中每个对象代表一个数据点。

```typescript
export type Datum = Record<string | number, any>;
export type Dataset = Datum[];
```

---

### Dimensions

`Dimensions` 是一个 `Dimension` 对象数组，用于定义图表的维度。

```typescript
export type Dimension = {
  /**
   * 维度ID
   */
  id: string;
  /**
   * 维度别名
   */
  alias?: string;
  /**
   * 是否可见
   * @default true
   */
  visible?: boolean;
  /**
   * 维度位置
   */
  location: 'dimension' | 'rowDimension' | 'columnDimension';
};

export type Dimensions = Dimension[] | undefined;
```

---

### Measures

`Measures` 是 `Measure` 或 `MeasureGroup` 对象的数组，用于定义图表的度量。

```typescript
export type Measure = {
  /**
   * 度量ID
   */
  id: string;
  /**
   * 度量别名
   */
  alias?: string;
  /**
   * 是否可见
   * @default true
   */
  visible?: boolean;
  /**
   * 是否自动格式化
   * @default true
   */
  autoFormat?: boolean;
  /**
   * 格式化选项
   */
  format?: {
    type?: 'number' | 'percent' | 'permille';
    ratio?: number;
    symbol?: string;
    thousandSeparator?: boolean;
    decimalPlaces?: number;
    round?: 'round' | 'floor' | 'ceil';
    prefix?: string;
    suffix?: string;
  };
};

export type MeasureGroup = {
  id: string;
  alias?: string;
  visible?: boolean;
  children?: (MeasureGroup | Measure)[];
};

export type Measures = (MeasureGroup | Measure)[] | undefined;
```

---

### BackgroundColor

`BackgroundColor` 是一个字符串，用于定义图表的背景颜色。

```typescript
/**
 * 图表的背景颜色
 * @default transparent 默认为透明背景
 * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
 */
export type BackgroundColor = string | undefined;
```

---

### Color

`Color` 对象用于定义图表的颜色方案。

```typescript
export type Color = {
  /**
   * 颜色配色方案
   * @description 定义图表中不同元素的颜色。
   */
  colorScheme: string[];
  /**
   * 颜色映射
   * @description 将数据值映射到具体的颜色。
   */
  colorMapping: Record<string, string>;
};
```

---

### Label

`Label` 对象用于配置数据标签。

```typescript
export type Label = {
  /**
   * 是否开启标签
   * @default true
   */
  enable: boolean;
};
```

---

### Legend

`Legend` 对象用于配置图例。

```typescript
export type Legend = {
  /**
   * 是否开启图例
   * @default true
   */
  enable?: boolean;
  /**
   * 是否显示图例边框
   * @default true
   */
  border?: boolean;
  /**
   * 图例最大列数或行数
   * @default 1
   */
  maxSize?: number;
  /**
   * 图例标签字体大小
   * @default 12
   */
  labelFontSize?: number;
  /**
   * 图例标签字体颜色
   * @default '#fff'
   */
  labelFontColor?: string;
  /**
   * 图例标签字体粗细
   * @default 400
   */
  labelFontWeight?: number | string;
  /**
   * 图例形状
   * @default 'rectRound'
   */
  shapeType?: 'circle' | 'cross' | 'diamond' | 'square' | 'arrow' | 'arrow2Left' | 'arrow2Right' | 'wedge' | 'thinTriangle' | 'triangle' | 'triangleUp' | 'triangleDown' | 'triangleRight' | 'triangleLeft' | 'stroke' | 'star' | 'wye' | 'rect' | 'arrowLeft' | 'arrowRight' | 'rectRound' | 'roundLine';
  /**
   * 图例位置
   * @default 'top'
   */
  position?: 'left' | 'leftTop' | 'leftBottom' | 'lt' | 'lb' | 'top' | 'topLeft' | 'topRight' | 'tl' | 'tr' | 'right' | 'rightTop' | 'rightBottom' | 'rt' | 'rb' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'bl' | 'br';
};
```

---

### Tooltip

`Tooltip` 对象用于配置提示信息。

```typescript
export type Tooltip = {
  /**
   * 是否开启提示信息
   * @default true
   */
  enable: boolean;
};
```

---

### Axis

`Axis` 是坐标轴的通用配置。

```typescript
export type Axis = {
  /**
   * 轴是否可见
   * @default true
   */
  visible?: boolean;
  /**
   * 轴的最小值
   */
  min?: number;
  /**
   * 轴的最大值
   */
  max?: number;
  /**
   * 是否自动调整轴的刻度间隔
   * @default true
   */
  nice?: boolean;
  /**
   * 轴是否反向展示
   * @default false
   */
  inverse?: boolean;
  /**
   * 是否在坐标轴上显示 0 值
   * @default true
   */
  zero?: boolean;
  /**
   * 轴标签是否自动隐藏
   * @default true
   */
  labelAutoHide?: boolean;
  /**
   * 轴标签自动隐藏的间隔
   * @default 4
   */
  labelAutoHideGap?: number;
  /**
   * 轴标签是否自动旋转
   * @default true
   */
  labelAutoRotate?: boolean;
  /**
   * 轴标签自动旋转的角度范围
   * @default [0, -45, -90]
   */
  labelAutoRotateAngleRange?: number[];
  /**
   * 轴标签是否自动限制长度
   * @default true
   */
  labelAutoLimit?: boolean;
  /**
   * 轴标签自动限制的最大长度
   * @default 100
   */
  labelAutoLimitLength?: number;
  /**
   * 轴刻度标签
   */
  label?: {
    visible?: boolean;
    labelColor?: string;
    labelFontSize?: number;
    labelFontWeight?: number;
    labelAngle?: number;
  };
  /**
   * 轴线
   */
  line?: {
    visible?: boolean;
    lineColor?: string;
    lineWidth?: number;
  };
  /**
   * 轴刻度
   */
  tick?: {
    visible?: boolean;
    tickInside?: boolean;
    tickColor?: string;
    tickSize?: number;
  };
  /**
   * 轴标题
   */
  title?: {
    visible?: boolean;
    titleText?: string;
    titleColor?: string;
    titleFontSize?: number;
  };
};
```

---

### XLinearAxis & YBandAxis

`XLinearAxis` (数值轴) 和 `YBandAxis` (类目轴) 分别用于定义X轴和Y轴。

```typescript
export type XLinearAxis = Omit<Axis, 'labelAutoHide' | 'labelAutoHideGap' | 'labelAutoRotate' | 'labelAutoRotateAngleRange' | 'labelAutoLimit' | 'labelAutoLimitLength'>;
export type YBandAxis = Omit<Axis, 'min' | 'max' | 'nice' | 'zero'>;
```

---

### CrosshairRect

`CrosshairRect` 用于配置水平提示框。

```typescript
export type CrosshairRect = {
  visible?: boolean;
  rectColor?: string;
  labelColor?: string;
  labelVisible?: boolean;
  labelBackgroundColor?: string;
};
```

---

### StackCornerRadius

`StackCornerRadius` 用于定义堆叠条形图的圆角。

```typescript
export type StackCornerRadius = number | number[];
```

---

### Theme

`Theme` 是一个字符串，用于定义图表的主题。

```typescript
/**
 * 主题
 * @default light
 * @description 内置 light、dark 两种主题, 新的主题可以通过registerTheme自定义主题.
 */
export type Theme = 'light' | 'dark' | string;
```

---

### BarStyle

`BarStyle` 对象用于定义条形图的样式。

```typescript
export type BarStyle = {
  /**
   * 数据选择器
   * @description 若配置, 则样式仅对匹配的数据生效; 否则全局生效。
   */
  selector?: Selector | Selectors;
  /**
   * 条形图颜色
   */
  barColor?: string;
  /**
   * 条形图颜色透明度
   * @default 1
   */
  barColorOpacity?: number;
  /**
   * 条形图边框颜色
   */
  barBorderColor?: string;
  /**
   * 条形图边框宽度
   * @default 0
   */
  barBorderWidth?: number;
  /**
   * 条形图边框样式
   * @default 'solid'
   */
  barBorderStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * 条形图圆角
   * @default 0
   */
  barRadius?: number | number[];
};
```

---

### AnnotationPoint

`AnnotationPoint` 对象用于定义标注点。

```typescript
export type AnnotationPoint = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors;
  /**
   * 标注的文本
   */
  text?: string | string[];
  /**
   * 文本颜色
   * @default '#ffffff'
   */
  textColor?: string;
  /**
   * 文本字体大小
   * @default 12
   */
  textFontSize?: number;
  /**
   * 文本字体重量
   * @default 400
   */
  textFontWeight?: number;
  /**
   * 文本对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'right' | 'center';
  /**
   * 文本垂直对齐方式
   * @default 'middle'
   */
  textBaseline?: 'top' | 'middle' | 'bottom';
  /**
   * 文本Y方向的偏移量
   * @default 0
   */
  offsetY?: number;
  /**
   * 文本X方向的偏移量
   * @default 0
   */
  offsetX?: number;
  /**
   * 背景是否可见
   * @default true
   */
  backgroundVisible?: boolean;
  /**
   * 背景颜色
   * @default '#212121'
   */
  backgroundColor?: string;
  /**
   * 背景边框颜色
   */
  backgroundBorderColor?: string;
  /**
   * 背景边框宽度
   * @default 1
   */
  backgroundBorderWidth?: number;
  /**
   * 背景边框圆角
   * @default 4
   */
  backgroundBorderRadius?: number;
  /**
   * 背景内边距
   * @default 4
   */
  backgroundPadding?: number;
};
```

---

### AnnotationVerticalLine

`AnnotationVerticalLine` 对象用于定义垂直标注线。

```typescript
export type AnnotationVerticalLine = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors;
  /**
   * 固定的x值, 用于标注垂直线
   */
  xValue?: (number | string) | (number | string)[];
  /**
   * 标注的文本
   */
  text?: string | string[];
  /**
   * 文本位置
   * @default 'insideEnd'
   */
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd';
  /**
   * 文本颜色
   * @default '#ffffff'
   */
  textColor?: string;
  /**
   * 文本字体大小
   * @default 12
   */
  textFontSize?: number;
  /**
   * 文本字体重量
   * @default 400
   */
  textFontWeight?: number;
  /**
   * 文本对齐方式
   * @default 'right'
   */
  textAlign?: 'left' | 'right' | 'center';
  /**
   * 文本垂直对齐方式
   * @default 'top'
   */
  textBaseline?: 'top' | 'middle' | 'bottom';
  /**
   * 文本Y方向的偏移量
   * @default 0
   */
  offsetY?: number;
  /**
   * 文本X方向的偏移量
   * @default 0
   */
  offsetX?: number;
  /**
   * 线是否可见
   * @default true
   */
  lineVisible?: boolean;
  /**
   * 线颜色
   */
  lineColor?: string;
  /**
   * 线宽度
   * @default 2
   */
  lineWidth?: number;
  /**
   * 线样式
   * @default 'solid'
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * 背景是否可见
   * @default true
   */
  backgroundVisible?: boolean;
  /**
   * 背景颜色
   * @default '#212121'
   */
  backgroundColor?: string;
  /**
   * 背景边框颜色
   */
  backgroundBorderColor?: string;
  /**
   * 背景边框宽度
   * @default 1
   */
  backgroundBorderWidth?: number;
  /**
   * 背景边框圆角
   * @default 4
   */
  backgroundBorderRadius?: number;
  /**
   * 背景内边距
   * @default 4
   */
  backgroundPadding?: number;
};
```

---

### AnnotationHorizontalLine

`AnnotationHorizontalLine` 对象用于定义水平标注线。

```typescript
export type AnnotationHorizontalLine = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors;
  /**
   * 固定的y值, 用于标注水平线
   */
  yValue?: (number | string) | (number | string)[];
  /**
   * 标注的文本
   */
  text?: string | string[];
  /**
   * 文本位置
   * @default 'insideEnd'
   */
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd';
  /**
   * 文本颜色
   * @default '#ffffff'
   */
  textColor?: string;
  /**
   * 文本字体大小
   * @default 12
   */
  textFontSize?: number;
  /**
   * 文本字体重量
   * @default 400
   */
  textFontWeight?: number;
  /**
   * 文本对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'right' | 'center';
  /**
   * 文本垂直对齐方式
   * @default 'bottom'
   */
  textBaseline?: 'top' | 'middle' | 'bottom';
  /**
   * 文本Y方向的偏移量
   * @default 0
   */
  offsetY?: number;
  /**
   * 文本X方向的偏移量
   * @default 0
   */
  offsetX?: number;
  /**
   * 线是否可见
   * @default true
   */
  lineVisible?: boolean;
  /**
   * 线颜色
   */
  lineColor?: string;
  /**
   * 线宽度
   * @default 2
   */
  lineWidth?: number;
  /**
   * 线样式
   * @default 'solid'
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * 背景是否可见
   * @default true
   */
  backgroundVisible?: boolean;
  /**
   * 背景颜色
   * @default '#212121'
   */
  backgroundColor?: string;
  /**
   * 背景边框颜色
   */
  backgroundBorderColor?: string;
  /**
   * 背景边框宽度
   * @default 1
   */
  backgroundBorderWidth?: number;
  /**
   * 背景边框圆角
   * @default 4
   */
  backgroundBorderRadius?: number;
  /**
   * 背景内边距
   * @default 4
   */
  backgroundPadding?: number;
};
```

---

### AnnotationArea

`AnnotationArea` 对象用于定义标注区域。

```typescript
export type AnnotationArea = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors;
  /**
   * 标注的文本
   */
  text?: string | string[];
  /**
   * 文本位置
   * @default 'top'
   */
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right';
  /**
   * 文本颜色
   * @default '#ffffff'
   */
  textColor?: string;
  /**
   * 文本字体大小
   * @default 12
   */
  textFontSize?: number;
  /**
   * 文本字体重量
   * @default 400
   */
  textFontWeight?: number;
  /**
   * 文本对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'right' | 'center';
  /**
   * 文本垂直对齐方式
   * @default 'middle'
   */
  textBaseline?: 'top' | 'middle' | 'bottom';
  /**
   * 背景是否可见
   * @default true
   */
  backgroundVisible?: boolean;
  /**
   * 背景颜色
   * @default '#212121'
   */
  backgroundColor?: string;
  /**
   * 背景边框颜色
   */
  backgroundBorderColor?: string;
  /**
   * 背景边框宽度
   * @default 1
   */
  backgroundBorderWidth?: number;
  /**
   * 背景边框圆角
   * @default 4
   */
  backgroundBorderRadius?: number;
  /**
   * 背景内边距
   * @default 4
   */
  backgroundPadding?: number;
  /**
   * 面积区域颜色
   */
  areaColor?: string;
  /**
   * 面积区域颜色透明度
   * @default 0.5
   */
  areaColorOpacity?: number;
  /**
   * 面积区域边框颜色
   */
  areaBorderColor?: number;
  /**
   * 面积区域边框宽度
   * @default 2
   */
  areaBorderWidth?: number;
  /**
   * 面积区域边框圆角
   * @default 4
   */
  areaBorderRadius?: number;
  /**
   * 面积区域的边距
   * @default 8
   */
  outerPadding?: number;
};
```

---

### Selector

`Selector` 用于从数据集中选择数据。

```typescript
// 值选择器
export type ValueSelector = string | number;

// 部分数据选择器
export type PartialDatumSelector = Datum;

// 度量选择器
export type MeasureSelector = {
  field: string;
  operator?: '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between';
  value: string | number | Array<string | number>;
};

// 维度选择器
export type DimensionSelector = {
  field: string;
  operator?: 'in' | 'not in';
  value: string | number | Array<string | number>;
};

export type Selector = ValueSelector | PartialDatumSelector | MeasureSelector | DimensionSelector;

export type Selectors = Array<Selector>;
```
        