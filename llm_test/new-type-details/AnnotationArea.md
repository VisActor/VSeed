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