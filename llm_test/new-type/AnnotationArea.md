### AnnotationArea
标注区域配置, 根据选择的数据, 定义图表的标注区域, 包括标注区域的位置, 样式等.
```typescript
export type AnnotationArea = {
  /**
   * 依赖选择的数据, 进行数据标记.
   */
  selector: Selector | Selectors

  /**
   * 标注的文本
   * @description 标注的文本
   * @default ''
   * @example '标注文本'
   */
  text?: string | string[]

  /**
   * 文本位置
   * @description 文本位置
   * @default 'top'
   * @example 'top'
   */
  textPosition?: 'top' | 'topRight' | 'topLeft' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'

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
   * @default 'left'
   * @example 'left'
   */
  textAlign?: 'left' | 'right' | 'center'
  /**
   * 文本垂直对齐方式
   * @description 文本垂直对齐方式
   * @default 'middle'
   * @example 'middle'
   */
  textBaseline?: 'top' | 'middle' | 'bottom'
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

  /**
   * 面积区域颜色
   * @description 面积区域颜色
   * @default 'red'
   * @example 'red'
   */
  areaColor?: string
  /**
   * 面积区域颜色透明度
   * @description 面积区域颜色透明度
   * @default 0.5
   * @example 0.5
   */
  areaColorOpacity?: number
  /**
   * 面积区域边框颜色
   * @description 面积区域边框颜色
   * @default 'red'
   * @example 'red'
   */
  areaBorderColor?: number
  /**
   * 面积区域边框宽度
   * @description 面积区域边框宽度
   * @default 2
   * @example 2
   */
  areaBorderWidth?: number
  /**
   * 面积区域边框圆角
   * @description 面积区域边框圆角
   * @default 4
   * @example 4
   */
  areaBorderRadius?: number
  /**
   * 面积区域的边距
   * @description 面积区域的边距
   * @default 8
   * @example 0
   */
  outerPadding?: number
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
  