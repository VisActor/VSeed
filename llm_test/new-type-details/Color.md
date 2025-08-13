`Color` 对象用于定义图表的颜色方案。

```typescript
export type Color = {
  /**
   * 颜色配色方案
   * @description 定义图表中不同元素的颜色。
   */
  colorScheme: string[];
  /**
   * 颜色映射
   * @description 将数据值映射到具体的颜色。
   */
  colorMapping: Record<string, string>;
};
```