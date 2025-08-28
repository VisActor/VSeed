import { z } from 'zod'
import { zLocale } from '../../i18n'
import { zBackgroundColor, zDataset, zDimensions, zTheme, zMeasures } from '../../properties'

export const zPivotTable = z.object({
  chartType: z.literal('pivotTable'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),

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
