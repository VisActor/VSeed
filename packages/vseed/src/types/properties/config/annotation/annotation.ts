export interface AnnotationPoint {
  textColor?: string | null
  textFontSize?: number | null
  textFontWeight?: number | null

  textBackgroundColor?: string | null
  textBackgroundBorderColor?: string | null
  textBackgroundBorderWidth?: number | null
  textBackgroundVisible?: boolean | null
  textBackgroundPadding?: number | null
}

export interface AnnotationHorizontalLine {
  lineColor?: string | null
  lineWidth?: number | null
  lineVisible?: boolean | null

  lineStyle?: 'solid' | 'dashed' | 'dotted' | null

  startSymbolVisible?: boolean | null
  startSymbolType?: string | null
  startSymbolSize?: number | null

  endSymbolVisible?: boolean | null
  endSymbolType?: string | null
  endSymbolSize?: number | null

  textFontSize?: number | null
  textFontWeight?: number | null
  textColor?: string | null
  textBackgroundVisible?: boolean | null
  textBackgroundColor?: string | null
  textBackgroundBorderColor?: string | null
  textBackgroundBorderWidth?: number | null
  textBackgroundBorderRadius?: number | null
  textBackgroundPadding?: number | null
}

export type AnnotationVerticalLine = AnnotationHorizontalLine

export interface AnnotationArea {
  textColor?: string | null
  textFontSize?: number | null
  textFontWeight?: number | null

  textBackgroundVisible?: boolean | null
  textBackgroundColor?: string | null
  textBackgroundBorderColor?: string | null
  textBackgroundBorderWidth?: number | null
  textBackgroundBorderRadius?: number | null
  textBackgroundPadding?: number | null

  areaColor?: string | null
  areaColorOpacity?: number | null
  areaBorderColor?: string | null
  areaBorderWidth?: number | null
  areaBorderRadius?: number | null

  outerPadding?: number | null
}
