import { z } from 'zod'
import { zLocale } from '../../i18n'

import {
  zBackgroundColor,
  zColor,
  zDataset,
  zDimensions,
  zEncoding,
  zLabel,
  zLegend,
  zMeasures,
  zTheme,
  zTooltip,
  zBrush,
  zPage,
} from '../../properties'

export const zRose = z.object({
  chartType: z.literal('rose'),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  page: zPage.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  brush: zBrush.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
