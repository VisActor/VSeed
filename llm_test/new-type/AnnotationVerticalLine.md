### AnnotationVerticalLine
标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
```typescript
export type AnnotationVerticalLine = {
  /**
   * @description 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * @description 固定的x值, 用于标注垂直线, 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值
   */
  xValue?: (number | string) | (number | string)[]
  /**
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
  /**
   * @description 文本位置, 标注线的标签位置（标签相对线的相对位置）。
   * @example 'outsideEnd'
   */
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd'
  /**
   * @description 文本颜色
   * @example 'red'
   */
  textColor?: string
  /**
   * @description 文本字体大小
   * @example 12
   */
  textFontSize?: number
  /**
   * @description 文本字体重量
   * @example 400
   */
  textFontWeight?: number
  /**
   * @description 文本对齐方式, 一般情况下, 无需设置
   * 建议设置为'right', 这样可以确保文本在标注线的左侧
   * right: 文本在参考线的左侧, 文本的右侧边缘对齐(垂直)标注线
   * left: 文本在参考线的右侧, 文本的左侧边缘对齐(垂直)标注线
   * center: 文本在参考线的中心, 文本的中心对齐(垂直)标注线
   * @example 'right'
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * @description 文本垂直对齐方式, 一般情况下, 无需设置
   * 建议设置为'top', 这样可以确保文本完整的显示在图表的可见区域
   * top: 文本在参考线的底部, 文本的顶部边缘对齐(垂直)标注线的终点
   * middle: 文本在参考线的中心, 文本的中心对齐(垂直)标注线的终点
   * bottom: 文本在参考线的顶部, 文本的底部边缘对齐(垂直)标注线的终点
   * @example 'top'
   */
  textBaseline?: 'top' | 'middle' | 'bottom'

  /**
   * @description 线可见
   * @example true
   */
  lineVisible?: boolean
  /**
   * @description 线颜色
   * @example 'red'
   */
  lineColor?: string
  /**
   * @description 线宽度
   * @example 2
   */
  lineWidth?: number
  /**
   * @description 线样式
   * @example 'solid'
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted'
  /**
   * @description 背景可见
   * @example true
   */
  textBackgroundVisible?: boolean
  /**
   * @description 背景颜色
   * @example 'red'
   */
  textBackgroundColor?: string
  /**
   * @description 背景边框颜色
   * @example 'red'
   */
  textBackgroundBorderColor?: string
  /**
   * @description 背景边框宽度
   * @example 2
   */
  textBackgroundBorderWidth?: number
  /**
   * @description 背景边框圆角
   * @example 4
   */
  textBackgroundBorderRadius?: number
  /**
   * @description 背景内边距
   * @example 4
   */
  textBackgroundPadding?: number
}
```

### Selector
```typescript
export type Selector =
  | string
  | number
  | {
      field: string;
      operator?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      op?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: ("in" | "not in") | null;
      op?: ("in" | "not in") | null;
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
      operator?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      op?: ("=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between") | null;
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: ("in" | "not in") | null;
      op?: ("in" | "not in") | null;
      value: string | number | (string | number)[];
    }
)[];

```
  