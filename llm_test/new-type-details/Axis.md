`Axis` 是坐标轴的通用配置。

```typescript
export type Axis = {
  /**
   * 轴是否可见
   * @default true
   */
  visible?: boolean;
  /**
   * 轴的最小值
   */
  min?: number;
  /**
   * 轴的最大值
   */
  max?: number;
  /**
   * 是否自动调整轴的刻度间隔
   * @default true
   */
  nice?: boolean;
  /**
   * 轴是否反向展示
   * @default false
   */
  inverse?: boolean;
  /**
   * 是否在坐标轴上显示 0 值
   * @default true
   */
  zero?: boolean;
  /**
   * 轴标签是否自动隐藏
   * @default true
   */
  labelAutoHide?: boolean;
  /**
   * 轴标签自动隐藏的间隔
   * @default 4
   */
  labelAutoHideGap?: number;
  /**
   * 轴标签是否自动旋转
   * @default true
   */
  labelAutoRotate?: boolean;
  /**
   * 轴标签自动旋转的角度范围
   * @default [0, -45, -90]
   */
  labelAutoRotateAngleRange?: number[];
  /**
   * 轴标签是否自动限制长度
   * @default true
   */
  labelAutoLimit?: boolean;
  /**
   * 轴标签自动限制的最大长度
   * @default 100
   */
  labelAutoLimitLength?: number;
  /**
   * 轴刻度标签
   */
  label?: {
    visible?: boolean;
    labelColor?: string;
    labelFontSize?: number;
    labelFontWeight?: number;
    labelAngle?: number;
  };
  /**
   * 轴线
   */
  line?: {
    visible?: boolean;
    lineColor?: string;
    lineWidth?: number;
  };
  /**
   * 轴刻度
   */
  tick?: {
    visible?: boolean;
    tickInside?: boolean;
    tickColor?: string;
    tickSize?: number;
  };
  /**
   * 轴标题
   */
  title?: {
    visible?: boolean;
    titleText?: string;
    titleColor?: string;
    titleFontSize?: number;
  };
};
```