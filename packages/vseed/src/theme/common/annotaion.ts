import type {
  AnnotationAreaConfig,
  AnnotationHorizontalLineConfig,
  AnnotationPointConfig,
} from 'src/types/properties/config/annotation/annotation'

export const getLightAnnotationPoint = (): AnnotationPointConfig => ({
  textColor: '#ffffff',

  textBackgroundVisible: true,
  textBackgroundColor: '#364159',
  textBackgroundBorderColor: '#3641594d',

  textFontSize: 12,
  textFontWeight: 400,

  textBackgroundBorderRadius: 4,
  textBackgroundBorderWidth: 1,
  textBackgroundPadding: 2,
})

export const getLightAnnotationHorizontalLine = (): AnnotationHorizontalLineConfig => ({
  lineColor: '#BCC1CB',
  lineWidth: 1,
  lineStyle: 'solid' as const,
  lineVisible: true,

  textColor: '#ffffff',
  textFontSize: 12,
  textFontWeight: 400,

  startSymbolVisible: true,
  endSymbolVisible: false,

  textBackgroundVisible: true,
  textBackgroundColor: '#BCC1CB',
  textBackgroundBorderColor: '#BCC1CB',
  textBackgroundBorderWidth: 1,
  textBackgroundBorderRadius: 0,
  textBackgroundPadding: 2,
})

export const getLightAnnotationVerticalLine = () => getLightAnnotationHorizontalLine()

export const getLightAnnotationArea = (): AnnotationAreaConfig => ({
  textColor: '#ffffff',
  textFontSize: 12,
  textFontWeight: 400,

  textBackgroundVisible: true,
  textBackgroundColor: '#BCC1CB',
  textBackgroundBorderColor: '#BCC1CB',
  textBackgroundBorderWidth: 1,
  textBackgroundBorderRadius: 0,
  textBackgroundPadding: 4,

  areaColor: '#BCC1CB',
  areaColorOpacity: 0.12,
  areaBorderColor: '#BCC1CB',
  areaBorderWidth: 0,
  areaBorderRadius: 0,
  areaLineDash: [2, 2],

  outerPadding: 4,
})

export const getLightAnnotation = () => ({
  annotationPoint: getLightAnnotationPoint(),
  annotationHorizontalLine: getLightAnnotationHorizontalLine(),
  annotationVerticalLine: getLightAnnotationVerticalLine(),
  annotationArea: getLightAnnotationArea(),
})

// --- dark ---
export const getDarkAnnotationPoint = (): AnnotationPointConfig => ({
  textColor: '#4B4F54',

  textBackgroundVisible: true,
  textBackgroundColor: '#ffffff',
  textBackgroundBorderColor: '#ffffff',

  textFontSize: 12,
  textFontWeight: 400,

  textBackgroundBorderRadius: 4,
  textBackgroundBorderWidth: 1,
  textBackgroundPadding: 2,
})

export const getDarkAnnotationHorizontalLine = (): AnnotationHorizontalLineConfig => ({
  lineColor: '#55595F',
  lineWidth: 1,
  lineStyle: 'solid' as const,
  lineVisible: true,

  textFontSize: 12,
  textFontWeight: 400,

  textBackgroundVisible: true,
  textColor: '#E2E3E6',
  textBackgroundColor: '#55595F',
  textBackgroundBorderColor: '#55595F',
  textBackgroundBorderWidth: 1,
  textBackgroundBorderRadius: 0,
  textBackgroundPadding: 2,
})

export const getDarkAnnotationVerticalLine = () => getDarkAnnotationHorizontalLine()

export const getDarkAnnotationArea = (): AnnotationAreaConfig => ({
  textColor: '#E2E3E6',
  textFontSize: 12,
  textFontWeight: 400,

  textBackgroundVisible: true,
  textBackgroundColor: '#55595F',
  textBackgroundBorderColor: '#55595F',
  textBackgroundBorderWidth: 1,
  textBackgroundBorderRadius: 0,
  textBackgroundPadding: 4,

  areaColor: '#E2E3E6',
  areaColorOpacity: 0.15,
  areaBorderColor: '#E2E3E6',
  areaBorderWidth: 0,
  areaBorderRadius: 0,
  areaLineDash: [2, 2],

  outerPadding: 4,
})

export const getDarkAnnotation = () => ({
  annotationPoint: getDarkAnnotationPoint(),
  annotationHorizontalLine: getDarkAnnotationHorizontalLine(),
  annotationVerticalLine: getDarkAnnotationVerticalLine(),
  annotationArea: getDarkAnnotationArea(),
})

export default getLightAnnotation
