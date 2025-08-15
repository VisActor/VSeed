### AnnotationVerticalLine
标注垂直线配置, 根据选择的数据, 定义图表的标注垂直线, 包括标注垂直线的位置, 样式等.
```typescript
export type AnnotationVerticalLine = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector?: Selector | Selectors
  /**
   * 固定的x值, 用于标注垂直线
   * @description 类目轴在x方向, 则可输入维值, 数值轴在x方向, 则可输入具体的数值
   * @default []
   */
  xValue?: (number | string) | (number | string)[]
  /**
   * 标注的文本
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]
  /**
   * 文本位置
   * @description 标注线的标签位置（标签相对线的相对位置）。
   * @default 'insideEnd'
   * @example 'outsideEnd'
   */
  textPosition?: 'outsideStart' | 'outsideEnd' | 'outsideMiddle' | 'insideStart' | 'insideMiddle' | 'insideEnd'
  /**
   * 文本颜色
   * @description 文本颜色
   * @default '#ffffff'
   * @example 'red'
   */
  textColor?: string
  /**
   * 文本字体大小
   * @description 文本字体大小
   * @default 12
   * @example 12
   */
  textFontSize?: number
  /**
   * 文本字体重量
   * @description 文本字体重量
   * @default 400
   * @example 400
   */
  textFontWeight?: number
  /**
   * 文本对齐方式
   * @description 文本对齐方式
   * @default 'right'
   * @example 'left'
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * 文本垂直对齐方式
   * @description 文本垂直对齐方式
   * @default 'top'
   * @example 'middle'
   */
  textBaseline?: 'top' | 'middle' | 'bottom'
  /**
   * 文本Y方向的, 偏移量
   * @description 文本Y方向的, 偏移量, 支持正负
   * @default 0
   * @example offsetY: 10
   */
  offsetY?: number
  /**
   * 文本X方向的, 偏移量
   * @description 文本X方向的, 偏移量, 支持正负
   * @default 0
   * @example offsetX: -10
   */
  offsetX?: number
  /**
   * 线可见
   * @description 线可见
   * @default true
   * @example true
   */
  lineVisible?: boolean
  /**
   * 线颜色
   * @description 线颜色
   * @default 'red'
   * @example 'red'
   */
  lineColor?: string
  /**
   * 线宽度
   * @description 线宽度
   * @default 2
   * @example 2
   */
  lineWidth?: number
  /**
   * 线样式
   * @description 线样式
   * @default 'solid'
   * @example 'solid'
   */
  lineStyle?: 'solid' | 'dashed' | 'dotted'
  /**
   * 背景可见
   * @description 背景可见
   * @default true
   * @example true
   */
  backgroundVisible?: boolean
  /**
   * 背景颜色
   * @description 背景颜色
   * @default '#212121'
   * @example 'red'
   */
  backgroundColor?: string
  /**
   * 背景边框颜色
   * @description 背景边框颜色
   * @default 'red'
   * @example 'red'
   */
  backgroundBorderColor?: string
  /**
   * 背景边框宽度
   * @description 背景边框宽度
   * @default 1
   * @example 2
   */
  backgroundBorderWidth?: number
  /**
   * 背景边框圆角
   * @description 背景边框圆角
   * @default 4
   * @example 4
   */
  backgroundBorderRadius?: number
  /**
   * 背景内边距
   * @description 背景内边距
   * @default 4
   * @example 4
   */
  backgroundPadding?: number
}
```

### Selector
```typescript
export type Selector =
  | string
  | number
  | {
      field: string;
      operator?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      op?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: "in" | "not in";
      op?: "in" | "not in";
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
      operator?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      op?: "=" | "==" | "!=" | ">" | "<" | ">=" | "<=" | "between";
      value: string | number | (string | number)[];
    }
  | {
      field: string;
      operator?: "in" | "not in";
      op?: "in" | "not in";
      value: string | number | (string | number)[];
    }
)[];

```
  