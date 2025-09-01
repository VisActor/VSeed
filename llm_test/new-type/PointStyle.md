### PointStyle
点图元样式配置, 用于定义图表的点图元样式, 包括点图元的颜色, 边框等.
支持全局样式或条件样式配置
数据筛选器
若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
若未配置selector, 则样式全局生效.
```typescript
export type PointStyle = {
  /**
   * 数据选择器
   * @description
   * 若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
   * 若未配置selector, 则样式全局生效.
   * @type {Selector | Selectors}
   * @example 数值选择器
   * selector = "tool"
   * selector = ["tool", "book"]
   * selector = 100
   * selector = [100, 200]
   * @example 局部数据选择器
   * selector = { profit: 100 }
   * selector = [{ profit: 100 }, { profit: 200 }]
   * @example 条件维度选择器
   * selector = {
   *  field: 'category',
   *  operator: 'in',
   *  value: 'tool'
   * }
   * selector = {
   *  field: 'category',
   *  operator: 'not in',
   *  value: 'book'
   * }
   * @example 条件指标选择器
   * selector = {
   *  field: 'profit',
   *  operator: '>=',
   *  value: 100
   * }
   * selector = {
   *  field: 'profit',
   *  operator: 'between'
   *  value: [100, 300]
   * }
   */
  selector?: Selector | Selectors

  /**
   * @description 点是否可见
   */
  pointVisible?: boolean
  /**
   * 点大小
   * @description 点大小
   */
  pointSize?: number
  /**
   * 点图元颜色
   * @description 点图元颜色
   */
  pointColor?: string
  /**
   * 点图元颜色透明度
   * @description 点图元颜色透明度
   */
  pointColorOpacity?: number
  /**
   * 点图元边框颜色
   * @description 点图元边框颜色
   */
  pointBorderColor?: string
  /**
   * 点图元边框宽度
   * @description 点图元边框宽度
   */
  pointBorderWidth?: number
  /**
   * 点图元边框样式
   * @description 点图元边框样式
   * @example solid
   * @example dashed
   * @example dotted
   */
  pointBorderStyle?: 'solid' | 'dashed' | 'dotted'
}
```

### Selector
```typescript
export type Selector =
  | string
  | number
  | {
      field: string;
      operator?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      op?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: ("in" | "not in") | null;
      op?: ("in" | "not in") | null;
      value: string | number | (string | number)[];
    };

```

### Selectors
```typescript
export type Selectors = (
  | string
  | number
  | {
      field: string;
      operator?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      op?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: ("in" | "not in") | null;
      op?: ("in" | "not in") | null;
      value: string | number | (string | number)[];
    }
)[];

```
  