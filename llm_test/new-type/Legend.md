### Legend
图例配置, 用于定义图表的图例, 包括图例的位置, 格式, 样式等.
```typescript
export type Legend = {
  /**
   * 图例功能是否开启
   * @default true
   * @example enable: true
   */
  enable?: boolean
  /**
   * 图例边框是否开启
   * @default true
   * @example border: true
   */
  border?: boolean
  /**
   * 图例字体大小
   * @default 12
   * @example labelFontSize: 10
   */
  labelFontSize?: number
  /**
   * 图例字体颜色
   * @default '#fff'
   * @example labelFontColor: '#212121'
   */
  labelFontColor?: string
  /**
   * 图例字体粗细
   * @default 400
   * @example labelFontWeight: 400
   */
  labelFontWeight?: number | string
  /**
   * 图例形状
   * @default 'rectRound'
   * @example shapeType: 'circle'
   */
  shapeType?:
    | 'circle'
    | 'cross'
    | 'diamond'
    | 'square'
    | 'arrow'
    | 'arrow2Left'
    | 'arrow2Right'
    | 'wedge'
    | 'thinTriangle'
    | 'triangle'
    | 'triangleUp'
    | 'triangleDown'
    | 'triangleRight'
    | 'triangleLeft'
    | 'stroke'
    | 'star'
    | 'wye'
    | 'rect'
    | 'arrowLeft'
    | 'arrowRight'
    | 'rectRound'
    | 'roundLine'
  /**
   * 图例位置
   * @default 'right'
   * @example position: 'rightTop'
   */
  position?:
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'lt'
    | 'lb'
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'tl'
    | 'tr'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
    | 'rt'
    | 'rb'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'bl'
    | 'br'

  /**
   * @description 存在大量图例时, 最大列数 或 图例最大行数
   *  如果position为水平方向(bottom, bottomLeft, bottomRight, bl, br, top, topLeft, topRight, tl, tr), maxSize控制显示的列数
   *  如果position为垂直方向(left, leftTop, leftBottom, lt, lb, right, rightTop, rightBottom, rt, rb), maxSize控制显示的行数
   * @example maxSize: 2
   * @default 1
   */
  maxSize?: number
}
```