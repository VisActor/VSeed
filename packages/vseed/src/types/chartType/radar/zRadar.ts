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
} from '../../properties'

export const zRadar = z.object({
  chartType: z.literal('radar'),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  brush: zBrush.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
