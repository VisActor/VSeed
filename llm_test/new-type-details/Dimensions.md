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