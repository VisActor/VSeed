`PointStyle` 对象用于定义折线图上的点的样式。

```typescript
export type PointStyle = {
  /**
   * 数据选择器
   * @description 若配置, 则样式仅对匹配的数据生效; 否则全局生效。
   */
  selector?: Selector | Selectors;
  /**
   * 点大小
   * @default 10
   */
  pointSize?: number;
  /**
   * 点颜色
   */
  pointColor?: string;
  /**
   * 点颜色透明度
   * @default 1
   */
  pointColorOpacity?: number;
  /**
   * 点边框颜色
   */
  pointBorderColor?: string;
  /**
   * 点边框宽度
   * @default 0
   */
  pointBorderWidth?: number;
  /**
   * 点边框样式
   * @default 'solid'
   */
  pointBorderStyle?: 'solid' | 'dashed' | 'dotted';
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