import type { AnnotationArea } from '../../annotation/annotationArea'
import type { AnnotationHorizontalLine } from '../../annotation/annotationHorizontalLine'
import type { AnnotationPoint } from '../../annotation/annotationPoint'

export type AnnotationPointConfig = Pick<
  AnnotationPoint,
  | 'textColor'
  | 'textFontSize'
  | 'textFontWeight'
  | 'textBackgroundVisible'
  | 'textBackgroundColor'
  | 'textBackgroundBorderColor'
  | 'textBackgroundBorderWidth'
  | 'textBackgroundPadding'
  | 'textBackgroundBorderRadius'
  | 'offsetX'
  | 'offsetY'
>

export interface AnnotationHorizontalLineConfig
  extends Pick<
    AnnotationHorizontalLine,
    | 'textFontSize'
    | 'lineColor'
    | 'lineStyle'
    | 'lineVisible'
    | 'lineWidth'
    | 'textColor'
    | 'textBackgroundBorderColor'
    | 'textBackgroundBorderRadius'
    | 'textBackgroundBorderWidth'
    | 'textBackgroundColor'
    | 'textBackgroundPadding'
    | 'textBackgroundVisible'
    | 'textFontWeight'
  > {
  /**
   * 起点图标是否显示
   */
  startSymbolVisible?: boolean | null
  /**
   * 起点图标的类型，支持如下枚举值：
   * 'circle'
   * | 'cross'
   * | 'diamond'
   * | 'square'
   * | 'arrow'
   * | 'arrowLeft'
   * | 'arrowRight'
   * | 'arrow2Left'
   * | 'arrow2Right'
   * | 'wedge'
   * | 'thinTriangle'
   * | 'triangle'
   * | 'triangleUp'
   * | 'triangleDown'
   * | 'triangleRight'
   * | 'triangleLeft'
   * | 'stroke'
   * | 'star'
   * | 'wye'
   * | 'rect'
   * | 'rectRound'
   * | 'roundLine'
   */
  startSymbolType?: string | null
  /**
   * 起点图标的大小
   */
  startSymbolSize?: number | null

  /**
   * 终点图标是否显示
   */
  endSymbolVisible?: boolean | null
  /**
   * 终点图标的类型，支持如下枚举值：
   * 'circle'
   * | 'cross'
   * | 'diamond'
   * | 'square'
   * | 'arrow'
   * | 'arrowLeft'
   * | 'arrowRight'
   * | 'arrow2Left'
   * | 'arrow2Right'
   * | 'wedge'
   * | 'thinTriangle'
   * | 'triangle'
   * | 'triangleUp'
   * | 'triangleDown'
   * | 'triangleRight'
   * | 'triangleLeft'
   * | 'stroke'
   * | 'star'
   * | 'wye'
   * | 'rect'
   * | 'rectRound'
   * | 'roundLine'
   */
  endSymbolType?: string | null
  /**
   * 终点图标的大小
   */
  endSymbolSize?: number | null
}

export type AnnotationVerticalLineConfig = AnnotationHorizontalLineConfig

export type AnnotationAreaConfig = Pick<
  AnnotationArea,
  | 'areaBorderColor'
  | 'areaBorderRadius'
  | 'areaBorderWidth'
  | 'areaColor'
  | 'areaColorOpacity'
  | 'areaLineDash'
  | 'outerPadding'
  | 'textBackgroundBorderColor'
  | 'textBackgroundBorderRadius'
  | 'textBackgroundBorderWidth'
  | 'textBackgroundColor'
  | 'textBackgroundPadding'
  | 'textBackgroundVisible'
  | 'textColor'
  | 'textFontSize'
  | 'textFontWeight'
>
