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
  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasureTree.optional(),
  backgroundColor: zBackgroundColor.optional(),
  label: zLabel.optional(),
  xAxis: zXBandAxis.optional(),
  yAxis: zYLinearAxis.optional(),
  crosshairLine: zCrosshairLine.optional(),
  theme: zTheme.optional(),
  pointStyle: z.array(zPointStyle).or(zPointStyle).optional(),
  lineStyle: z.array(zLineStyle).or(zLineStyle).optional(),
  areaStyle: z.array(zAreaStyle).or(zAreaStyle).optional(),
  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).optional(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).optional(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).optional(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).optional(),
  locale: zLocale.optional(),
})
