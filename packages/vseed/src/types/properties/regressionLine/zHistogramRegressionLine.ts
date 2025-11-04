import { z } from 'zod'

export const zHistogramRegressionLine = z.object({
  type: z.union([z.literal('kde'), z.literal('ecdf')]).nullish(),
  color: z.string().nullish(),
  lineWidth: z.number().nullish(),
  lineDash: z.array(z.number()).nullish(),
  text: z.string().nullish(),
  textColor: z.string().nullish(),
  textFontSize: z.number().nullish(),
  textFontWeight: z.number().nullish(),
})
