### AnnotationPoint
标注点配置, 根据选择的数据, 定义图表的标注点, 包括标注点的位置, 格式, 样式等.
```typescript
export type AnnotationPoint = {
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