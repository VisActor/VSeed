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