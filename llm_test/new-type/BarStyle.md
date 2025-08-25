### BarStyle
条形图样式配置, 用于定义图表的条形图样式, 包括条形图的颜色, 边框, 圆角等.
支持全局样式或条件样式配置
数据筛选器
若配置selector, 提供数值 selector, 局部数据 selector, 条件维度 selector, 条件指标 selector 共四类数据匹配能力
若未配置selector, 则样式全局生效.
```typescript
export type BarStyle = {
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
   * 柱状图颜色
   * @description 柱状图颜色
   * @type {string}
   */
  barColor?: string
  /**
   * 柱状图颜色透明度
   * @description 柱状图颜色透明度
   * @type {number}
   */
  barColorOpacity?: number
  /**
   * 柱状图边框颜色
   * @description 柱状图边框颜色
   * @type {string}
   */
  barBorderColor?: string
  /**
   * 柱状图边框宽度
   * @description 柱状图边框宽度
   * @type {number}
   */
  barBorderWidth?: number
  /**
   * 柱状图边框样式
   * @description 柱状图边框样式
   * @type {number}
   * @example solid
   * @example dashed
   * @example dotted
   */
  barBorderStyle?: 'solid' | 'dashed' | 'dotted'
  /**
   * 柱状图圆角
   * @description 柱状图圆角
   * @type {number | number[]}
   * @example 4
   * @example [0, 0, 10, 10]
   */
  barRadius?: number | number[]
}
```

### Selector
```typescript
export type Selector =
  | string
  | number
  | {
      field: string;
      operator?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      op?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: "in" | "not in";
      op?: "in" | "not in";
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
      operator?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      op?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: "in" | "not in";
      op?: "in" | "not in";
      value: string | number | (string | number)[];
    }
)[];

```
  