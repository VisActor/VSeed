# AreaPercent 图表类型定义

`AreaPercent` 组件用于渲染百分比面积图。百分比面积图适用于展示多类别占比随时间变化的趋势，Y轴以百分比形式展示占比关系。

## AreaPercent

```typescript
export interface AreaPercent {
  /**
   * 图表类型
   * @description 固定为 'areaPercent'
   */
  chartType: 'areaPercent'
  /**
   * 数据集
   * @description 定义图表的数据来源和结构。
   */
  dataset: Dataset
  /**
   * 维度
   * @description 第一个维度被映射到X轴, 其余维度会与指标名称(存在多个指标时)合并, 作为图例项展示.
   */
  dimensions?: Dimensions
  /**
   * 指标
   * @description 百分比面积图的指标会自动合并为一个指标, 映射到Y轴, 指标名称会与其余维度合并, 作为图例项展示.
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
   * 标注点配置
   * @description 根据所选数据定义图表的标注点。
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
export type Datum = Record<string | number, any>
export type Dataset = Datum[]
```

---

### Dimensions

`Dimensions` 是一个 `Dimension` 对象数组，用于定义图表的维度。

```typescript
export type Dimension = {
  /**
   * 维度ID
   */
  id: string
  /**
   * 维度别名
   */
  alias?: string
}

export type Dimensions = Dimension[]
```

---

### Measures

`Measures` 是 `Measure` 对象的数组，用于定义图表的度量。

```typescript
export type Measure = {
  /**
   * 度量ID
   */
  id: string
  /**
   * 度量别名
   */
  alias?: string
  /**
   * 格式化选项
   */
  format?: {
    type?: 'number' | 'percent' | 'permille'
    ratio?: number
    symbol?: string
    thousandSeparator?: boolean
    decimalPlaces?: number
    round?: 'round' | 'floor' | 'ceil'
    prefix?: string
    suffix?: string
  }
}

export type Measures = Measure[]
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
export type BackgroundColor = string | undefined
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
  colorScheme: string[]
  /**
   * 颜色映射
   * @description 将数据值映射到具体的颜色。
   */
  colorMapping: Record<string, string>
}
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
  enable: boolean
}
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
  enable?: boolean
  /**
   * 图例位置
   * @default 'top'
   */
  position?:
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'lt'
    | 'lb'
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'tl'
    | 'tr'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
    | 'rt'
    | 'rb'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'bl'
    | 'br'
}
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
  enable: boolean
}
```

---

### XBandAxis

`XBandAxis` 用于配置 X 轴（类目轴）。

```typescript
export interface XBandAxis {
  /**
   * 是否显示坐标轴
   * @default true
   */
  visible?: boolean
  /**
   * 坐标轴标题
   */
  title?: {
    /**
     * 是否显示标题
     * @default true
     */
    visible?: boolean
    /**
     * 标题内容
     */
    text?: string
  }
  /**
   * 坐标轴标签
   */
  label?: {
    /**
     * 是否显示标签
     * @default true
     */
    visible?: boolean
    /**
     * 标签旋转角度
     * @default 0
     */
    rotate?: number
  }
}
```

---

### YLinearAxis

`YLinearAxis` 用于配置 Y 轴（数值轴）。

```typescript
export interface YLinearAxis {
  /**
   * 是否显示坐标轴
   * @default true
   */
  visible?: boolean
  /**
   * 坐标轴标题
   */
  title?: {
    /**
     * 是否显示标题
     * @default true
     */
    visible?: boolean
    /**
     * 标题内容
     */
    text?: string
  }
  /**
   * 坐标轴标签
   */
  label?: {
    /**
     * 是否显示标签
     * @default true
     */
    visible?: boolean
  }
}
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
export type Theme = 'light' | 'dark' | string
```

---

### AnnotationPoint

`AnnotationPoint` 对象用于定义标注点。

```typescript
export type AnnotationPoint = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors
  /**
   * 标注的文本
   */
  text?: string | string[]
}
```

---

### AnnotationVerticalLine

`AnnotationVerticalLine` 对象用于定义标注垂直线。

```typescript
export type AnnotationVerticalLine = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * 固定的x值, 用于标注垂直线
   */
  xValue?: (number | string) | (number | string)[]
  /**
   * 标注的文本
   */
  text?: string | string[]
}
```

---

### AnnotationHorizontalLine

`AnnotationHorizontalLine` 对象用于定义标注水平线。

```typescript
export type AnnotationHorizontalLine = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * 固定的y值, 用于标注水平线
   */
  yValue?: (number | string) | (number | string)[]
  /**
   * 标注的文本
   */
  text?: string | string[]
}
```

---

### AnnotationArea

`AnnotationArea` 对象用于定义标注区域。

```typescript
export type AnnotationArea = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors
  /**
   * 标注的文本
   */
  text?: string | string[]
}
```

---

### Selector

`Selector` 用于从数据集中选择数据。

```typescript
// 值选择器
export type ValueSelector = string | number

// 部分数据选择器
export type PartialDatumSelector = Datum

// 度量选择器
export type MeasureSelector = {
  field: string
  operator?: '=' | '==' | '!=' | '>' | '<' | '>=' | '<=' | 'between'
  value: string | number | Array<string | number>
}

// 维度选择器
export type DimensionSelector = {
  field: string
  operator?: 'in' | 'not in'
  value: string | number | Array<string | number>
}

export type Selector =
  | ValueSelector
  | PartialDatumSelector
  | MeasureSelector
  | DimensionSelector

export type Selectors = Array<Selector>
```
        