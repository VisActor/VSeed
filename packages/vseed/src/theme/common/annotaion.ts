import type {
  AnnotationAreaConfig,
  AnnotationHorizontalLineConfig,
  AnnotationPointConfig,
} from 'src/types/properties/config/annotation/annotation'

export const getDefaultAnnotationPoint = (): AnnotationPointConfig => ({
  textBackgroundVisible: true,
  textFontSize: 12,
  textFontWeight: 400,

  textBackgroundBorderRadius: 0,
  textBackgroundBorderWidth: 1,
  textBackgroundPadding: 2,
})

export const getLightAnnotationPoint = (): AnnotationPointConfig => ({
  ...getDefaultAnnotationPoint(),
  textColor: '#ffffff',
  textBackgroundColor: '#BCC1CB',
  textBackgroundBorderColor: '#BCC1CB',
})

export const getDefaultAnnotationLine = (): AnnotationHorizontalLineConfig => ({
  lineVisible: true,
  lineWidth: 1,
  lineStyle: 'solid' as const,

  textFontSize: 12,
  textFontWeight: 400,
  startSymbolVisible: true,
  endSymbolVisible: false,

  textBackgroundVisible: true,
  textBackgroundBorderWidth: 1,
  textBackgroundBorderRadius: 0,
  textBackgroundPadding: 2,
})

export const getLightAnnotationHorizontalLine = (): AnnotationHorizontalLineConfig => ({
  ...getDefaultAnnotationLine(),
  lineColor: '#BCC1CB',

  textColor: '#ffffff',

  textBackgroundColor: '#BCC1CB',
  textBackgroundBorderColor: '#BCC1CB',
})

export const getLightAnnotationVerticalLine = () => getLightAnnotationHorizontalLine()

export const getDefaultAnnotationArea = (): AnnotationAreaConfig => ({
  textFontSize: 12,
  textFontWeight: 400,
  textBackgroundVisible: true,
  textBackgroundBorderWidth: 1,
  textBackgroundBorderRadius: 0,
  textBackgroundPadding: 2,
  areaBorderWidth: 0,
  areaBorderRadius: 0,
  areaLineDash: [2, 2],

  outerPadding: 4,
})

export const getLightAnnotationArea = (): AnnotationAreaConfig => ({
  ...getDefaultAnnotationArea(),
  textColor: '#ffffff',

  textBackgroundColor: '#BCC1CB',
  textBackgroundBorderColor: '#BCC1CB',

  areaColor: '#BCC1CB',
  areaColorOpacity: 0.12,
  areaBorderColor: '#BCC1CB',
})

export const getLightAnnotation = () => ({
  annotationPoint: getLightAnnotationPoint(),
  annotationHorizontalLine: getLightAnnotationHorizontalLine(),
  annotationVerticalLine: getLightAnnotationVerticalLine(),
  annotationArea: getLightAnnotationArea(),
})

// --- dark ---
export const getDarkAnnotationPoint = (): AnnotationPointConfig => ({
  ...getDefaultAnnotationPoint(),
  textColor: '#E2E3E6',

  textBackgroundColor: '#55595F',
  textBackgroundBorderColor: '#55595F',
})

export const getDarkAnnotationHorizontalLine = (): AnnotationHorizontalLineConfig => ({
  ...getDefaultAnnotationLine(),
  lineColor: '#55595F',

  textColor: '#E2E3E6',
  textBackgroundColor: '#55595F',
  textBackgroundBorderColor: '#55595F',
})

export const getDarkAnnotationVerticalLine = () => getDarkAnnotationHorizontalLine()

export const getDarkAnnotationArea = (): AnnotationAreaConfig => ({
  ...getDefaultAnnotationArea(),
  textColor: '#E2E3E6',

  textBackgroundColor: '#55595F',
  textBackgroundBorderColor: '#55595F',

  areaColor: '#E2E3E6',
  areaColorOpacity: 0.15,
  areaBorderColor: '#E2E3E6',
})

export const getDarkAnnotation = () => ({
  annotationPoint: getDarkAnnotationPoint(),
  annotationHorizontalLine: getDarkAnnotationHorizontalLine(),
  annotationVerticalLine: getDarkAnnotationVerticalLine(),
  annotationArea: getDarkAnnotationArea(),
})

export default getLightAnnotation
