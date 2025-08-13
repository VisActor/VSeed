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