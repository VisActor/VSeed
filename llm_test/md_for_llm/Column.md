# Column 图表类型定义

`Column` 组件用于渲染柱状图。柱状图适用于纵向数据对比场景，X轴为类目轴（分类数据），Y轴为数值轴（连续数据），柱子纵向排列。

## Column

```typescript
export interface Column {
  /**
   * 图表类型
   * @description 固定为 'column'
   */
  chartType: 'column'
  /**
   * 数据集
   * @description 定义图表的数据来源和结构。
   */
  dataset: Dataset
  /**
   * 维度
   * @description 柱状图的第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示。
   */
  dimensions?: Dimensions
  /**
   * 指标
   * @description 柱状图的所有指标会自动合并为一个指标, 映射到Y轴, 存在多个指标时, 指标名称会与其余维度合并, 作为图例项展示。
   */
  measures?: Measures
  /**
   * 图表的背景颜色
   * @description 支持颜色字符串、hex、rgb或rgba值。
   * @default 'transparent'
   */
  backgroundColor?: BackgroundColor
  /**
   * 颜色配置
   * @description 定义图表的颜色方案, 包括颜色列表, 颜色映射等。
   */
  color?: Color
  /**
   * 数据标签配置
   */
  label?: Label
  /**
   * 图例配置
   */
  legend?: Legend
  /**
   * 提示信息配置
   */
  tooltip?: Tooltip
  /**
   * x轴配置 (类目轴)
   */
  xAxis?: XBandAxis
  /**
   * y轴配置 (数值轴)
   */
  yAxis?: YLinearAxis
  /**
   * 图表主题
   * @description 内置 'light' 与 'dark' 两种主题。
   * @default 'light'
   */
  theme?: Theme
  /**
   * 矩形图元样式
   * @description 定义柱状图的样式，支持全局或按条件配置。
   */
  barStyle?: BarStyle
  /**
   * 标注点配置
   * @description 根据所选数据定义图表的标注点。
   */
  annotationPoint?: AnnotationPoint | AnnotationPoint[]
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

`BarStyle` 对象用于定义柱状图的样式。

```typescript
export type BarStyle = {
  /**
   * 数据选择器
   * @description 若配置, 则样式仅对匹配的数据生效; 否则全局生效。
   */
  selector?: Selector | Selectors;
  /**
   * 柱状图颜色
   */
  barColor?: string;
  /**
   * 柱状图颜色透明度
   * @default 1
   */
  barColorOpacity?: number;
  /**
   * 柱状图边框颜色
   */
  barBorderColor?: string;
  /**
   * 柱状图边框宽度
   * @default 0
   */
  barBorderWidth?: number;
  /**
   * 柱状图边框样式
   * @default 'solid'
   */
  barBorderStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * 柱状图圆角
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
        