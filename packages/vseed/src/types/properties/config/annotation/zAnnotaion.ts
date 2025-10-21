import { z } from 'zod'

export const zAnnotationPoint = z.object({
  textColor: z.string().nullish(),
  textFontSize: z.number().nullish(),
  textFontWeight: z.number().nullish(),

  textBackgroundColor: z.string().nullish(),
  textBackgroundBorderColor: z.string().nullish(),
  textBackgroundBorderWidth: z.number().nullish(),
  textBackgroundVisible: z.boolean().nullish(),
  textBackgroundPadding: z.number().nullish(),
  textBackgroundBorderRadius: z.number().nullish(),

  offsetX: z.number().nullish(),
  offsetY: z.number().nullish(),
})

export const zAnnotationHorizontalLine = z.object({
  lineColor: z.string().nullish(),
  lineWidth: z.number().nullish(),
  lineVisible: z.boolean().nullish(),
  lineStyle: z.enum(['solid', 'dashed', 'dotted']).nullish(),

  endSymbolVisible: z.boolean().nullish(),
  endSymbolType: z.string().nullish(),
  endSymbolSize: z.number().nullish(),

  startSymbolVisible: z.boolean().nullish(),
  startSymbolType: z.string().nullish(),
  startSymbolSize: z.number().nullish(),

  textBackgroundVisible: z.boolean().nullish(),
  textColor: z.string().nullish(),
  textFontSize: z.number().nullish(),
  textFontWeight: z.number().nullish(),
  textBackgroundColor: z.string().nullish(),
  textBackgroundBorderColor: z.string().nullish(),
  textBackgroundBorderWidth: z.number().nullish(),
  textBackgroundBorderRadius: z.number().nullish(),
  textBackgroundPadding: z.number().nullish(),
})

export const zAnnotationVerticalLine = zAnnotationHorizontalLine.clone()

export const zAnnotationArea = z.object({
  textColor: z.string().nullish(),
  textFontSize: z.number().nullish(),
  textFontWeight: z.number().nullish(),

  textBackgroundVisible: z.boolean().nullish(),
  textBackgroundColor: z.string().nullish(),
  textBackgroundBorderColor: z.string().nullish(),
  textBackgroundBorderWidth: z.number().nullish(),
  textBackgroundBorderRadius: z.number().nullish(),
  textBackgroundPadding: z.number().nullish(),

  areaColor: z.string().nullish(),
  areaColorOpacity: z.number().nullish(),
  areaBorderColor: z.string().nullish(),
  areaBorderWidth: z.number().nullish(),
  areaBorderRadius: z.number().nullish(),

  outerPadding: z.number().nullish(),
})

export const zAnnotaionConfig = z.object({
  annotationPoint: zAnnotationPoint.nullish(),
  annotationHorizontalLine: zAnnotationHorizontalLine.nullish(),
  annotationVerticalLine: zAnnotationVerticalLine.nullish(),
  annotationArea: zAnnotationArea.nullish(),
})
