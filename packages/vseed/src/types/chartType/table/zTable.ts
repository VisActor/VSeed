import { z } from 'zod'
import { zLocale } from '../../i18n'
import { zBackgroundColor, zDataset, zDimensions, zMeasureTree, zTheme } from '../../properties'

export const zTable = z.object({
  chartType: z.literal('table'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  borderColor: z.string().nullish(),
  bodyFontSize: z.number().nullish(),
  bodyFontColor: z.string().nullish(),
  bodyBackgroundColor: z.string().nullish(),
  hoverBodyBackgroundColor: z.string().nullish(),
  hoverBodyInlineBackgroundColor: z.string().nullish(),
  headerFontSize: z.number().nullish(),
  headerFontColor: z.string().nullish(),
  headerBackgroundColor: z.string().nullish(),
  hoverHeaderBackgroundColor: z.string().nullish(),
  hoverHeaderInlineBackgroundColor: z.string().nullish(),
  selectedBorderColor: z.string().nullish(),
  selectedBackgroundColor: z.string().nullish(),

  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
