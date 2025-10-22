import { zSelector, zSelectors } from '../../dataSelector'
import { z } from 'zod'

export const zAnnotationArea = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  textPosition: z
    .enum(['top', 'topRight', 'topLeft', 'bottom', 'bottomLeft', 'bottomRight', 'left', 'right'])
    .default('top')
    .nullish(),
  text: z.string().or(z.array(z.string())).nullish(),
  textColor: z.string().default('#ffffff').nullish(),
  textFontSize: z.number().default(12).nullish(),
  textFontWeight: z.number().default(400).nullish(),
  textAlign: z.enum(['left', 'right', 'center']).default('center').nullish(),
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('top').nullish(),

  textBackgroundVisible: z.boolean().default(true).nullish(),
  textBackgroundColor: z.string().default('#191d24').nullish(),
  textBackgroundBorderColor: z.string().default('#191d24').nullish(),
  textBackgroundBorderWidth: z.number().default(1).nullish(),
  textBackgroundBorderRadius: z.number().default(4).nullish(),
  textBackgroundPadding: z.number().default(4).nullish(),

  areaColor: z.string().default('#888888').nullish(),
  areaColorOpacity: z.number().default(0.15).nullish(),
  areaBorderColor: z.string().default('#888888').nullish(),
  areaBorderWidth: z.number().default(1).nullish(),
  areaBorderRadius: z.number().default(4).nullish(),
  areaLineDash: z.array(z.number()).nullish(),

  outerPadding: z.number().default(4).nullish(),
})
