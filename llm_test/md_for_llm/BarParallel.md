# BarParallel 图表类型定义

`BarParallel` 组件用于渲染并列条形图。并列条形图适用于多指标横向并行对比场景，多个条形平行排列展示不同指标值。

## BarParallel

```typescript
export interface BarParallel {
  /**
   * 并列条形图
   * @description 并列条形图，适用于多指标横向并行对比场景
   * @type {'barParallel'}
   * @example 'barParallel'
   */
  chartType: 'barParallel'
  /**
   * 数据集
   * @description 符合TidyData规范的且已经聚合的数据集，用于定义图表的数据来源和结构, 用户输入的数据集并不需要进行任何处理, VSeed带有强大的数据重塑功能, 会自行进行数据重塑, 并列条形图的数据最终会被转换为2个维度, 1个指标.
   * @type {Array<Record<string|number, any>>}
   * @example [{category:'A', value1:100, value2:200}, {category:'B', value1:150, value2:250}]
   */
  dataset: Dataset

  /**
   * 维度
   * @description 第一个维度被映射到Y轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   * @type {Dimensions}
   * @example [{id: 'category', alias: '类别'}]
   */
  dimensions?: Dimensions

  /**
   * 指标
   * @description 并列条形图指标会自动合并为一个指标, 映射到X轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示.
   * @type {Measures}
   * @example [{id: 'value1', alias: '指标1'}, {id: 'value2', alias: '指标2'}]
   */
  measures?: Measures

  /**
   * 图表的背景颜色
   * @default transparent 默认为透明背景
   * @description 背景颜色可以是颜色字符串, 例如'red', 'blue', 也可以是hex, rgb或rgba'#ff0000', 'rgba(255,0,0,0.5)'
   */
  backgroundColor?: BackgroundColor

  /**
   * 颜色
   * @description 颜色配置, 用于定义图表的颜色方案, 包括颜色列表, 颜色映射, 颜色渐变等.
   */
  color?: Color

  /**
   * 标签
   * @description 标签配置, 用于定义图表的数据标签, 包括数据标签的位置, 格式, 样式等.
   */
  label?: Label

  /**
   * 图例
   * @description 图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
   */
  legend?: Legend

  /**
   * 提示信息
   * @description 提示信息配置, 用于定义图表的提示信息, 包括提示信息的位置, 格式, 样式等.
   */
  tooltip?: Tooltip

  /**
   * x轴
   * @description 数值轴, x轴配置, 用于定义图表的x轴, 包括x轴的位置, 格式, 样式等.
   */
  xAxis?: XLinearAxis

  /**
   * y轴
   * @description 类目轴, y轴配置, 用于定义图表的y轴, 包括y轴的位置, 格式, 样式等.
   */
  yAxis?: YBandAxis

  /**
   * 图表的主题, 主题是优先级较低的功能配置, 包含所有图表类型共用的通用配置, 与单类图表类型共用的图表配置
   * @default light 默认为亮色主题
   * @description 内置light与dark两种主题, 用户可以通过Builder自定义主题
   * @example 'dark'
   * @example 'light'
   * @example 'customThemeName'
   */
  theme?: Theme

  /**
   * 矩形图元样式
   * @description 条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
   * 支持全局样式或条件样式配置
   * 数据筛选器
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   */
  barStyle?: BarStyle

  /**
   * 标注点
   * @description 标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]

  /**
   * 标注垂直线
   * @description 标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
   */
  annotationVerticalLine?: AnnotationVerticalLine | AnnotationVerticalLine[]

  /**
   * 标注水平线
   * @description 标注水平线配置, 根据选择的数据, 定义图表的标注水平线, 包括标注水平线的位置, 样式等.
   */
  annotationHorizontalLine?: AnnotationHorizontalLine | AnnotationHorizontalLine[]

  /**
   * 标注区域
   * @description 标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
   */
  annotationArea?: AnnotationArea | AnnotationArea[]
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

### XLinearAxis

`XLinearAxis` 用于配置X轴（数值轴）。

```typescript
export type XLinearAxis = {
  visible?: boolean;
  min?: number;
  max?: number;
  nice?: boolean;
  zero?: boolean;
  inverse?: boolean;
  label?: {
    visible?: boolean;
    labelColor?: string;
    labelFontSize?: number;
    labelFontWeight?: number;
    labelAngle?: number;
  };
  line?: {
    visible?: boolean;
    lineColor?: string;
    lineWidth?: number;
  };
  tick?: {
    visible?: boolean;
    tickInside?: boolean;
    tickColor?: string;
    tickSize?: number;
  };
  title?: {
    visible?: boolean;
    titleText?: string;
    titleColor?: string;
    titleFontSize?: number;
    titleFontWeight?: number;
  };
  grid?: {
    visible?: boolean;
    gridColor?: string;
    gridWidth?: number;
  };
};
```

---

### YBandAxis

`YBandAxis` 用于配置Y轴（类目轴）。

```typescript
export type YBandAxis = {
  visible?: boolean;
  labelAutoHide?: boolean;
  labelAutoHideGap?: number;
  labelAutoRotate?: boolean;
  labelAutoRotateAngleRange?: number[];
  labelAutoLimit?: boolean;
  labelAutoLimitLength?: number;
  label?: {
    visible?: boolean;
    labelColor?: string;
    labelFontSize?: number;
    labelFontWeight?: number;
    labelAngle?: number;
  };
  line?: {
    visible?: boolean;
    lineColor?: string;
    lineWidth?: number;
  };
  tick?: {
    visible?: boolean;
    tickInside?: boolean;
    tickColor?: string;
    tickSize?: number;
  };
  title?: {
    visible?: boolean;
    titleText?: string;
    titleColor?: string;
    titleFontSize?: number;
    titleFontWeight?: number;
  };
  grid?: {
    visible?: boolean;
    gridColor?: string;
    gridWidth?: number;
  };
};
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

`AnnotationVerticalLine` 对象用于定义标注垂直线。

```typescript
export type AnnotationVerticalLine = {
  selector?: Selector | Selectors;
  xValue?: (number | string) | (number | string)[];
  text?: string | string[];
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd';
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  textBaseline?: 'top' | 'middle' | 'bottom';
  offsetY?: number;
  offsetX?: number;
  lineVisible?: boolean;
  lineColor?: string;
  lineWidth?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  backgroundVisible?: boolean;
  backgroundColor?: string;
  backgroundBorderColor?: string;
  backgroundBorderWidth?: number;
  backgroundBorderRadius?: number;
  backgroundPadding?: number;
};
```

---

### AnnotationHorizontalLine

`AnnotationHorizontalLine` 对象用于定义标注水平线。

```typescript
export type AnnotationHorizontalLine = {
  selector?: Selector | Selectors;
  yValue?: (number | string) | (number | string)[];
  text?: string | string[];
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd';
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  textBaseline?: 'top' | 'middle' | 'bottom';
  offsetY?: number;
  offsetX?: number;
  lineVisible?: boolean;
  lineColor?: string;
  lineWidth?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  backgroundVisible?: boolean;
  backgroundColor?: string;
  backgroundBorderColor?: string;
  backgroundBorderWidth?: number;
  backgroundBorderRadius?: number;
  backgroundPadding?: number;
};
```

---

### AnnotationArea

`AnnotationArea` 对象用于定义标注区域。

```typescript
export type AnnotationArea = {
  selector: Selector | Selectors;
  text?: string | string[];
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right';
  textColor?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textAlign?: 'left' | 'right' | 'center';
  textBaseline?: 'top' | 'middle' | 'bottom';
  backgroundVisible?: boolean;
  backgroundColor?: string;
  backgroundBorderColor?: string;
  backgroundBorderWidth?: number;
  backgroundBorderRadius?: number;
  backgroundPadding?: number;
  areaColor?: string;
  areaColorOpacity?: number;
  areaBorderColor?: number;
  areaBorderWidth?: number;
  areaBorderRadius?: number;
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
        