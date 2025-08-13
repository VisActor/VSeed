`CrosshairLine` 对象用于配置鼠标悬浮时的垂直提示线。

```typescript
export type CrosshairLine = {
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 提示线颜色
   */
  lineColor?: string;
  /**
   * 标签颜色
   */
  labelColor?: string;
  /**
   * 标签是否可见
   */
  labelVisible?: boolean;
  /**
   * 标签背景颜色
   */
  labelBackgroundColor?: string;
}
```