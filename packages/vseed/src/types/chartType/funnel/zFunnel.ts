import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zBackgroundColor,
  zColorLegend,
  zDataset,
  zDimensions,
  zEncoding,
  zLabel,
  zLinearColor,
  zMeasureTree,
  zTheme,
  zTooltip,
} from '../../properties'

export const zFunnel = z.object({
  chartType: z.literal('funnel'),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
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
