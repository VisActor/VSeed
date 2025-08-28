import { z } from 'zod'
import { zLocale } from '../../i18n'

import {
  zBackgroundColor,
  zColorLegend,
  zDataset,
  zDimensions,
  zLabel,
  zLinearColor,
  zMeasureTree,
  zTheme,
  zTooltip,
} from '../../properties'

export const zHeatmap = z.object({
  chartType: z.literal('heatmap'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zLinearColor.nullish(),
  label: zLabel.nullish(),
  legend: zColorLegend.nullish(),
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
