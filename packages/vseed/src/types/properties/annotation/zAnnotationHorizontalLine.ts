import { zSelector, zSelectors } from '../../dataSelector'
import { z } from 'zod'

export const zAnnotationHorizontalLine = z.object({
  selector: z.union([zSelector, zSelectors]).nullish(),
  yValue: z.union([z.number(), z.string(), z.array(z.union([z.number(), z.string()]))]).nullish(),
  text: z.string().or(z.array(z.string())).nullish(),
  textPosition: z
    .enum(['outsideStart', 'outsideEnd', 'outsideMiddle', 'insideStart', 'insideMiddle', 'insideEnd'])
    .default('insideEnd')
    .nullish(),
  textColor: z.string().default('#ffffff').nullish(),
  textFontSize: z.number().default(12).nullish(),
  textFontWeight: z.number().default(400).nullish(),
  textAlign: z.enum(['left', 'right', 'center']).default('right').nullish(),
  textBaseline: z.enum(['top', 'middle', 'bottom']).default('top').nullish(),

  lineVisible: z.boolean().default(true).nullish(),
  lineColor: z.string().default('#212121').nullish(),
  lineWidth: z.number().default(1).nullish(),
  lineStyle: z
    .union([z.literal('solid'), z.literal('dashed'), z.literal('dotted')])
    .default('dashed')
    .nullish(),

  textBackgroundVisible: z.boolean().default(true).nullish(),
  textBackgroundColor: z.string().default('#212121').nullish(),
  textBackgroundBorderColor: z.string().default('#212121').nullish(),
  textBackgroundBorderRadius: z.number().default(4).nullish(),
  textBackgroundBorderWidth: z.number().default(1).nullish(),
  textBackgroundPadding: z.number().default(2).nullish(),
})
