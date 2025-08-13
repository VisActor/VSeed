`XLinearAxis` 用于配置X轴（数值轴）。

```typescript
export type XLinearAxis = {
  /**
   * 轴是否可见
   * @default true
   * @example true
   */
  visible?: boolean;
  /**
   * 轴的最小值
   * @description 优先级高于 nice 与 zero
   * @default undefined
   * @example 100
   */
  min?: number;
  /**
   * 轴的最大值
   * @description 优先级高于 nice 与 zero
   * @default undefined
   * @example 10000
   */
  max?: number;
  /**
   * 是否自动调整轴的刻度间隔，使刻度标签更易读
   * @description 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   * @default true
   * @example true
   */
  nice?: boolean;
  /**
   * 是否在坐标轴上显示 0 值,
   * @description 当配置了 min 和 max, 该配置项失效, 仅对数值轴生效
   * @default true
   * @example true
   */
  zero?: boolean;
  /**
   * 轴是否反向展示
   * @description 仅对数值轴生效
   * @default false
   * @example false
   */
  inverse?: boolean;
  /**
   * X轴刻度标签
   * @default true
   */
  label?: {
    /**
     * 标签是否可见
     * @default true
     */
    visible?: boolean;
    /**
     * 标签颜色
     * @default '#797B85'
     */
    labelColor?: string;
    /**
     * 标签字体大小
     * @default 12
     */
    labelFontSize?: number;
    /**
     * 标签字体粗细
     * @default 400
     */
    labelFontWeight?: number;
    /**
     * 标签旋转角度
     * @default 0
     */
    labelAngle?: number;
  };
  /**
   * X轴线
   * @example
   * {
   *   visible: true,
   *   lineColor: '#ffeecc',
   *   lineWidth: 2,
   * }
   */
  line?: {
    /**
     * 轴线是否可见
     * @default true
     */
    visible?: boolean;
    /**
     * 轴线颜色
     * @default 'rgba(54, 65, 89, 0.30)'
     */
    lineColor?: string;
    /**
     * 轴线宽度
     * @default 1
     */
    lineWidth?: number;
  };
  /**
   * X轴刻度
   * @default true
   */
  tick?: {
    /**
     * 刻度是否可见
     * @default true
     */
    visible?: boolean;
    /**
     * 刻度是否朝内
     * @default false
     */
    tickInside?: boolean;
    /**
     * 刻度颜色
     * @default 'rgba(54, 65, 89, 0.30)'
     */
    tickColor?: string;
    /**
     * 刻度尺寸
     * @default 4
     */
    tickSize?: number;
  };
  /**
   * X轴标题
   * @default false
   */
  title?: {
    /**
     * 标题是否可见
     * @default false
     */
    visible?: boolean;
    /**
     * 标题文本, 默认跟随字段配置
     * @default ''
     */
    titleText?: string;
    /**
     * 标题颜色
     * @default '#646A73'
     */
    titleColor?: string;
    /**
     * 标题字体大小
     * @default 12
     */
    titleFontSize?: number;
    /**
     * 标题字体粗细
     * @default 400
     */
    titleFontWeight?: number;
  };
  /**
   * X轴网格线
   * @default false
   */
  grid?: {
    /**
     * 网格线是否可见
     * @default false
     */
    visible?: boolean;
    /**
     * 网格线颜色
     * @default 'rgba(54, 65, 89, 0.15)'
     */
    gridColor?: string;
    /**
     * 网格线宽度
     * @default 0.5
     */
    gridWidth?: number;
  };
};
```