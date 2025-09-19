import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColor,
  zDataset,
  zDimensions,
  zEncoding,
  zLegend,
  zMeasureTree,
  zPieLabel,
  zTheme,
  zTooltip,
} from '../../properties'

export const zPie = z.object({
  chartType: z.literal('pie'),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zPieLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  theme: zTheme.nullish(),
  locale: zLocale.nullish(),
})
