`CrosshairRect` 用于配置水平提示框。

```typescript
export type CrosshairRect = {
  /**
   * 提示框背景色
   */
  crosshairRectFill?: string;
  /**
   * 提示框背景透明度
   */
  crosshairRectFillOpacity?: number;
  /**
   * 提示框边框色
   */
  crosshairRectStroke?: string;
  /**
   * 提示框边框透明度
   */
  crosshairRectStrokeOpacity?: number;
  /**
   * 提示框边框线宽
   */
  crosshairRectLineWidth?: number;
  /**
   * 提示框边框虚线
   */
  crosshairRectLineDash?: number[];
};
```