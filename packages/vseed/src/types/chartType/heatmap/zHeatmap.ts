import { z } from 'zod'
import { zLocale } from '../../i18n'

import {
  zBackgroundColor,
  zColor,
  zColorLegend,
  zDataset,
  zDimensions,
  zLabel,
  zMeasures,
  zTheme,
  zTooltip,
  zBrush,
} from '../../properties'

export const zHeatmap = z.object({
  chartType: z.literal('heatmap'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasures.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zColorLegend.nullish(),
  tooltip: zTooltip.nullish(),
  brush: zBrush.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
