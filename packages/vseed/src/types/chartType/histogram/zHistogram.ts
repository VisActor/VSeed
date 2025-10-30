import { z } from 'zod'
import { zLocale } from '../../i18n'
import {
  zAnnotationArea,
  zAnnotationHorizontalLine,
  zAnnotationPoint,
  zAnnotationVerticalLine,
  zBackgroundColor,
  zBarStyle,
  zColor,
  zCrosshairRect,
  zDataset,
  zDimensions,
  zEncoding,
  zLabel,
  zLegend,
  zMeasureTree,
  zTheme,
  zTooltip,
  zXLinearAxis,
  zYLinearAxis,
} from '../../properties'

export const zHistogram = z.object({
  chartType: z.literal('histogram'),
  dataset: zDataset.nullish(),
  encoding: zEncoding.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),
  xAxis: zXLinearAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairRect: zCrosshairRect.nullish(),
  theme: zTheme.nullish(),
  barStyle: z.array(zBarStyle).or(zBarStyle).nullish(),
  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).nullish(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).nullish(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).nullish(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).nullish(),
  locale: zLocale.nullish(),
})

export type Histogram = z.infer<typeof zHistogram>
