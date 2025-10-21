import { z } from 'zod'
import { zAnnotationPoint } from '../../annotation/zAnnotationPoint'
import { zAnnotationHorizontalLine } from '../../annotation/zAnnotationHorizontalLine'
import { zAnnotationArea } from '../../annotation/zAnnotationArea'

export const zAnnotationPointConfig = zAnnotationPoint.omit({ selector: true, text: true }).partial()

// Use pick to explicitly list fields we want to expose in config variants.
export const zAnnotationHorizontalLineConfig = zAnnotationHorizontalLine
  .pick({
    // only pick fields that exist on the runtime schema
    lineColor: true,
    lineWidth: true,
    lineVisible: true,
    lineStyle: true,

    textBackgroundVisible: true,
    textColor: true,
    textFontSize: true,
    textFontWeight: true,
    textBackgroundColor: true,
    textBackgroundBorderColor: true,
    textBackgroundBorderWidth: true,
    textBackgroundBorderRadius: true,
    textBackgroundPadding: true,
  })
  // extend with additional config-only fields that runtime schema doesn't include
  .extend({
    endSymbolVisible: z.boolean().nullish(),
    endSymbolType: z.string().nullish(),
    endSymbolSize: z.number().nullish(),

    startSymbolVisible: z.boolean().nullish(),
    startSymbolType: z.string().nullish(),
    startSymbolSize: z.number().nullish(),
  })
  .partial()

export const zAnnotationVerticalLineConfig = zAnnotationHorizontalLineConfig.clone()

export const zAnnotationAreaConfig = zAnnotationArea
  .pick({
    textColor: true,
    textFontSize: true,
    textFontWeight: true,

    textBackgroundVisible: true,
    textBackgroundColor: true,
    textBackgroundBorderColor: true,
    textBackgroundBorderWidth: true,
    textBackgroundBorderRadius: true,
    textBackgroundPadding: true,

    areaColor: true,
    areaColorOpacity: true,
    areaBorderColor: true,
    areaBorderWidth: true,
    areaBorderRadius: true,

    outerPadding: true,
  })
  .partial()

export const zAnnotaionConfig = z.object({
  annotationPoint: zAnnotationPointConfig.nullish(),
  annotationHorizontalLine: zAnnotationHorizontalLineConfig.nullish(),
  annotationVerticalLine: zAnnotationVerticalLineConfig.nullish(),
  annotationArea: zAnnotationAreaConfig.nullish(),
})
