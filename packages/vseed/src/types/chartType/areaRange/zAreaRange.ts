import { z } from 'zod'

import { zLocale } from '../../i18n'
import {
  zAnnotationArea,
  zAnnotationHorizontalLine,
  zAnnotationPoint,
  zAnnotationVerticalLine,
  zAreaStyle,
  zBackgroundColor,
  zCrosshairLine,
  zDataset,
  zDimensions,
  zLabel,
  zLineStyle,
  zMeasureTree,
  zPointStyle,
  zTheme,
  zXBandAxis,
  zYLinearAxis,
} from '../../properties'

export const zAreaRange = z.object({
  chartType: z.literal('areaRange'),
  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),
  backgroundColor: zBackgroundColor.nullish(),
  label: zLabel.nullish(),
  xAxis: zXBandAxis.nullish(),
  yAxis: zYLinearAxis.nullish(),
  crosshairLine: zCrosshairLine.nullish(),
  theme: zTheme.nullish(),
  pointStyle: z.array(zPointStyle).or(zPointStyle).nullish(),
  lineStyle: z.array(zLineStyle).or(zLineStyle).nullish(),
  areaStyle: z.array(zAreaStyle).or(zAreaStyle).nullish(),
  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).nullish(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).nullish(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).nullish(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).nullish(),
  locale: zLocale.nullish(),
})
