`AreaStyle` 对象用于定义面积图的样式。

```typescript
export type AreaStyle = {
  /**
   * 数据选择器
   * @description 若配置, 则样式仅对匹配的数据生效; 否则全局生效。
   */
  selector?: Selector | Selectors;
  /**
   * 面积图元颜色
   */
  areaColor?: string;
  /**
   * 面积图元颜色透明度
   * @default 1
   */
  areaColorOpacity?: number;
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