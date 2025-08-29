import { z } from 'zod'

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
   * @example labelFontSize: 10
   */
  labelFontSize?: number
  /**
   * 图例字体颜色
   * @example labelFontColor: '#212121'
   */
  labelFontColor?: string
  /**
   * 图例字体粗细
   * @example labelFontWeight: 400
   */
  labelFontWeight?: number | string
  /**
   * 图例形状
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

export const zLegend = z.object({
  enable: z.boolean().default(true).nullish(),
  border: z.boolean().default(true).nullish(),
  maxSize: z.number().default(1).nullish(),
  shapeType: z
    .enum([
      'circle',
      'cross',
      'diamond',
      'square',
      'arrow',
      'arrow2Left',
      'arrow2Right',
      'wedge',
      'thinTriangle',
      'triangle',
      'triangleUp',
      'triangleDown',
      'triangleRight',
      'triangleLeft',
      'stroke',
      'star',
      'wye',
      'rect',
      'arrowLeft',
      'arrowRight',
      'rectRound',
      'roundLine',
    ])
    .default('rectRound')
    .nullish(),
  position: z
    .enum([
      'left',
      'leftTop',
      'leftBottom',
      'lt',
      'lb',
      'top',
      'topLeft',
      'topRight',
      'tl',
      'tr',
      'right',
      'rightTop',
      'rightBottom',
      'rt',
      'rb',
      'bottom',
      'bottomLeft',
      'bottomRight',
      'bl',
      'br',
    ])
    .default('bottom')
    .nullish(),
  labelFontSize: z.number().default(12).nullish(),
  labelFontColor: z.string().default('#fff').nullish(),
  labelFontWeight: z.number().or(z.string()).default(400).nullish(),
})

export type ColorLegend = Pick<Legend, 'position' | 'enable'>
export const zColorLegend = z.object({
  position: z
    .enum([
      'left',
      'leftTop',
      'leftBottom',
      'lt',
      'lb',
      'top',
      'topLeft',
      'topRight',
      'tl',
      'tr',
      'right',
      'rightTop',
      'rightBottom',
      'rt',
      'rb',
      'bottom',
      'bottomLeft',
      'bottomRight',
      'bl',
      'br',
    ])
    .default('bottom')
    .nullish(),
  enable: z.boolean().default(true).nullish(),
})
