### AreaStyle
面积图元样式配置, 用于定义图表的面积图元样式, 包括面积图元的颜色, 透明度, 边框等.
支持全局样式或条件样式配置
数据筛选器
若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
若未配置selector, 则样式全局生效.
```typescript
export type AreaStyle = {
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
   * 面积图元是否可见
   * @description 面积图元是否可见
   */
  areaVisible?: boolean

  /**
   * 面积图元的颜色
   * @description 面积图元的颜色
   */
  areaColor?: string
  /**
   * 面积图元的颜色透明度
   * @description 面积图元的颜色透明度
   */
  areaColorOpacity?: number
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
  