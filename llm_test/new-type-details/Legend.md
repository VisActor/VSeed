`Legend` 对象用于配置图例。

```typescript
export type Legend = {
  /**
   * 是否开启图例
   * @default true
   */
  enable?: boolean;
  /**
   * 是否显示图例边框
   * @default true
   */
  border?: boolean;
  /**
   * 图例最大列数或行数
   * @default 1
   */
  maxSize?: number;
  /**
   * 图例标签字体大小
   * @default 12
   */
  labelFontSize?: number;
  /**
   * 图例标签字体颜色
   * @default '#fff'
   */
  labelFontColor?: string;
  /**
   * 图例标签字体粗细
   * @default 400
   */
  labelFontWeight?: number | string;
  /**
   * 图例形状
   * @default 'rectRound'
   */
  shapeType?: 'circle' | 'cross' | 'diamond' | 'square' | 'arrow' | 'arrow2Left' | 'arrow2Right' | 'wedge' | 'thinTriangle' | 'triangle' | 'triangleUp' | 'triangleDown' | 'triangleRight' | 'triangleLeft' | 'stroke' | 'star' | 'wye' | 'rect' | 'arrowLeft' | 'arrowRight' | 'rectRound' | 'roundLine';
  /**
   * 图例位置
   * @default 'top'
   */
  position?: 'left' | 'leftTop' | 'leftBottom' | 'lt' | 'lb' | 'top' | 'topLeft' | 'topRight' | 'tl' | 'tr' | 'right' | 'rightTop' | 'rightBottom' | 'rt' | 'rb' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'bl' | 'br';
};
```