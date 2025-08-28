import { z } from 'zod'
import { zLocale } from '../../i18n'
import { zBackgroundColor, zDataset, zDimensions, zTheme, zMeasures } from '../../properties'

export const zPivotTable = z.object({
  chartType: z.literal('pivotTable'),
  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasures.optional(),

  backgroundColor: zBackgroundColor.optional(),
  borderColor: z.string().optional(),
  bodyFontSize: z.number().optional(),
  bodyFontColor: z.string().optional(),
  bodyBackgroundColor: z.string().optional(),
  hoverBodyBackgroundColor: z.string().optional(),
  hoverBodyInlineBackgroundColor: z.string().optional(),
  headerFontSize: z.number().optional(),
  headerFontColor: z.string().optional(),
  headerBackgroundColor: z.string().optional(),
  hoverHeaderBackgroundColor: z.string().optional(),
  hoverHeaderInlineBackgroundColor: z.string().optional(),
  selectedBorderColor: z.string().optional(),
  selectedBackgroundColor: z.string().optional(),

  theme: zTheme.optional(),
  locale: zLocale.optional(),
})
