`AnnotationArea` 对象用于定义标注区域。

```typescript
export type AnnotationArea = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors;
  /**
   * 标注的文本
   */
  text?: string | string[];
  /**
   * 文本位置
   */
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right';
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
  /**
   * 面积区域颜色
   */
  areaColor?: string;
  /**
   * 面积区域颜色透明度
   */
  areaColorOpacity?: number;
  /**
   * 面积区域边框颜色
   */
  areaBorderColor?: number;
  /**
   * 面积区域边框宽度
   */
  areaBorderWidth?: number;
  /**
   * 面积区域边框圆角
   */
  areaBorderRadius?: number;
  /**
   * 面积区域的边距
   */
  outerPadding?: number;
};
```