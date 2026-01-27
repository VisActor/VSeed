import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColor,
  zColorLegend,
  zDataset,
  zDimensions,
  zEncoding,
  zLabel,
  zMeasures,
  zPage,
  zTheme,
  zTooltip,
  zBrush,
} from '../../properties'

export const zFunnel = z.object({
  chartType: z.literal('funnel'),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  page: zPage.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zColorLegend.nullish(),
  tooltip: zTooltip.nullish(),
  brush: zBrush.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
