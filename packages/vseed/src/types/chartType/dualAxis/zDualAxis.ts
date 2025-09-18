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

  dataset: zDataset.nullish(),
  dimensions: zDimensions.nullish(),
  measures: zMeasureTree.nullish(),
  dualMeasures: zDualMeasures.nullish(),

  dualChartType: z.array(zDualChartType).or(zDualChartType).nullish(),
  alignTicks: z.array(z.boolean()).or(z.boolean()).nullish(),

  primaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).nullish(),
  secondaryYAxis: z.array(zYLinearAxis).or(zYLinearAxis).nullish(),
  xAxis: zXBandAxis.nullish(),

  backgroundColor: zBackgroundColor.nullish(),
  color: zColor.nullish(),
  label: zLabel.omit({ labelLayout: true }).nullish(),
  legend: zLegend.nullish(),
  tooltip: zTooltip.nullish(),

  crosshairRect: zCrosshairRect.nullish(),
  sort: zSort.nullish(),
  sortLegend: zSortLegend.nullish(),
  theme: zTheme.nullish(),

  barStyle: z.array(zBarStyle).or(zBarStyle).nullish(),
  pointStyle: z.array(zPointStyle).or(zPointStyle).nullish(),
  lineStyle: z.array(zLineStyle).or(zLineStyle).nullish(),
  areaStyle: z.array(zAreaStyle).or(zAreaStyle).nullish(),

  annotationPoint: z.array(zAnnotationPoint).or(zAnnotationPoint).nullish(),
  annotationVerticalLine: z.array(zAnnotationVerticalLine).or(zAnnotationVerticalLine).nullish(),
  annotationHorizontalLine: z.array(zAnnotationHorizontalLine).or(zAnnotationHorizontalLine).nullish(),
  annotationArea: z.array(zAnnotationArea).or(zAnnotationArea).nullish(),

  locale: zLocale.nullish(),
})
