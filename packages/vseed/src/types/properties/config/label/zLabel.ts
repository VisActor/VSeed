import { z } from 'zod'
import { zNumFormat } from '../../measures'

export const zLabel = z.object({
  enable: z.boolean().nullish(),
  wrap: z.boolean().nullish(),
  showValue: z.boolean().nullish(),
  showValuePercent: z.boolean().nullish(),
  autoFormat: z.boolean().nullish(),
  numFormat: zNumFormat.nullish(),
  labelFontSize: z.number().nullish(),
  labelFontWeight: z.number().or(z.string()).nullish(),
  labelBackgroundColor: z.string().nullish(),
  labelColor: z.string().nullish(),
  labelColorSmartInvert: z.boolean().nullish(),
  labelPosition: z.string().nullish(),
  labelOverlap: z.boolean().nullish(),
})
