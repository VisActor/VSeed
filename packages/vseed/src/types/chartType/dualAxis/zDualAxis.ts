import { z } from 'zod'
import { zLocale } from 'src/types/i18n'
import {
  zAnnotationArea,
  zAnnotationHorizontalLine,
  zAnnotationPoint,
  zAnnotationVerticalLine,
  zAreaStyle,
  zBackgroundColor,
  zBarStyle,
  zColor,
  zCrosshairRect,
  zDataset,
  zDimensions,
  zDualChartType,
  zDualMeasures,
  zLabel,
  zLegend,
  zLineStyle,
  zMeasureTree,
  zPointStyle,
  zSort,
  zSortLegend,
  zTheme,
  zTooltip,
  zXBandAxis,
  zYLinearAxis,
} from 'src/types/properties'

export const zDualAxis = z.object({
  chartType: z.literal('dualAxis'),

  dataset: zDataset.optional(),
  dimensions: zDimensions.optional(),
  measures: zMeasureTree.optional(),
  dualMeasures: zDualMeasures.optional(),

  dualChartType: z.array(zDualChartType).or(zDualChartType).optional(),

  primaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).optional(),
  secondaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).optional(),
  xAxis: zXBandAxis.optional(),

  backgroundColor: zBackgroundColor.optional(),
  color: zColor.optional(),
  label: zLabel.optional(),
  legend: zLegend.optional(),
  tooltip: zTooltip.optional(),

  crosshairRect: zCrosshairRect.optional(),
  sort: zSort.optional(),
  sortLegend: zSortLegend.optional(),
  theme: zTheme.optional(),

  barStyle: z.array(zBarStyle).or(zBarStyle).optional(),
  pointStyle: z.array(zPointStyle).or(zPointStyle).optional(),
  lineStyle: z.array(zLineStyle).or(zLineStyle).optional(),
  areaStyle: z.array(zAreaStyle).or(zAreaStyle).optional(),

  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).optional(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).optional(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).optional(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).optional(),

  locale: zLocale.optional(),
})
