import { zSelector, zSelectors } from '../../dataSelector'
import { z } from 'zod'

export const zAnnotationPoint = z.object({
  selector: z.union([zSelector, zSelectors]),
  text: z.string().or(z.array(z.string())).nullish(),
  textColor: z.string().default('#ffffff').nullish(),
  textFontSize: z.number().default(12).nullish(),
  textFontWeight: z.number().default(400).nullish(),
  textAlign: z.enum(['left', 'right', 'center']).default('center').nullish(),
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('middle').nullish(),
  textBackgroundVisible: z.boolean().default(true).nullish(),
  textBackgroundColor: z.string().default('#212121').nullish(),
  textBackgroundBorderColor: z.string().nullish(),
  textBackgroundBorderWidth: z.number().default(1).nullish(),
  textBackgroundBorderRadius: z.number().default(4).nullish(),
  textBackgroundPadding: z.number().nullish(),

  offsetY: z.number().default(0).nullish(),
  offsetX: z.number().default(0).nullish(),
})
