`BarStyle` 对象用于定义条形图的样式。

```typescript
export type BarStyle = {
  /**
   * 数据选择器
   * @description 若配置, 则样式仅对匹配的数据生效; 否则全局生效。
   */
  selector?: Selector | Selectors;
  /**
   * 条形图颜色
   */
  barColor?: string;
  /**
   * 条形图颜色透明度
   * @default 1
   */
  barColorOpacity?: number;
  /**
   * 条形图边框颜色
   */
  barBorderColor?: string;
  /**
   * 条形图边框宽度
   * @default 0
   */
  barBorderWidth?: number;
  /**
   * 条形图边框样式
   * @default 'solid'
   */
  barBorderStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * 条形图圆角
   * @default 0
   */
  barRadius?: number | number[];
};
```