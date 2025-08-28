import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColor,
  zDataset,
  zDimensions,
  zLabel,
  zLegend,
  zMeasureTree,
  zTheme,
  zTooltip,
} from '../../properties'

export const zRoseParallel = z.object({
  chartType: z.literal('roseParallel'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
