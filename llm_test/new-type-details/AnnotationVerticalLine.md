`AnnotationVerticalLine` 对象用于定义标注垂直线。

```typescript
export type AnnotationVerticalLine = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors;
  /**
   * 固定的x值, 用于标注垂直线
   */
  xValue?: (number | string) | (number | string)[];
  /**
   * 标注的文本
   */
  text?: string | string[];
  /**
   * 文本位置
   */
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd';
  /**
   * 文本颜色
   */
  textColor?: string;
  /**
   * 文本字体大小
   */
  textFontSize?: number;
  /**
   * 文本字体重量
   */
  textFontWeight?: number;
  /**
   * 文本对齐方式
   */
  textAlign?: 'left' | 'right' | 'center';
  /**
   * 文本垂直对齐方式
   */
  textBaseline?: 'top' | 'middle' | 'bottom';
  /**
   * 文本Y方向的偏移量
   */
  offsetY?: number;
  /**
   * 文本X方向的偏移量
   */
  offsetX?: number;
  /**
   * 线是否可见
   */
  lineVisible?: boolean;
  /**
   * 线颜色
   */
  lineColor?: string;
  /**
   * 线宽度
   */
  lineWidth?: number;
  /**
   * 线样式
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  /**
   * 背景是否可见
   */
  backgroundVisible?: boolean;
  /**
   * 背景颜色
   */
  backgroundColor?: string;
  /**
   * 背景边框颜色
   */
  backgroundBorderColor?: string;
  /**
   * 背景边框宽度
   */
  backgroundBorderWidth?: number;
  /**
   * 背景边框圆角
   */
  backgroundBorderRadius?: number;
  /**
   * 背景内边距
   */
  backgroundPadding?: number;
};
```