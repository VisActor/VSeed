import type { PivotChartSpecPipeline, VChartSpecPipeline } from 'src/types'
import {
  xBand,
  backgroundColor,
  discreteLegend,
  color,
  initPivot,
  datasetPivot,
  pivotDiscreteLegend,
  pivotIndicators,
  pivotAdapter,
  pivotIndicatorsAsRow,
  pivotGridStyle,
  pivotColumnDimensions,
  pivotRowDimensions,
  annotationVerticalLine,
  annotationHorizontalLine,
  pointStyle,
  lineStyle,
  pointStateDimensionHover,
  progressive,
  areaStyle,
  barStyle,
  verticalCrosshairRect,
  yLinearSecondary,
  yLinearPrimary,
  seriesDualAxis,
  series,
  colorBarStyleFill,
  colorPointStyleFill,
  colorLineStyleFill,
  colorAreaStyleFill,
  linearColor,
  colorAdapter,
  colorLegend,
  pivotColorLegend,
  linearColorForDualAxis,
  annotationAreaBand,
  barMaxWidth,
  barGapInGroup,
  stackCornerRadius,
  pivotTitle,
  pivotAxisStyle,
  dimensionLinkage,
  annotationPointOfDualAxis,
  barStyleFilter,
  pointStyleFilter,
  lineStyleFilter,
  areaStyleFilter,
  tooltipDualAxis,
  initDualAxis,
  dualChartType,
  datasetDualAxis,
  labelDualAxis,
  tooltipOfDualAxisSeries,
} from '../pipes'

const dualAxis: VChartSpecPipeline = [
  seriesDualAxis(
    [initDualAxis, dualChartType, datasetDualAxis, labelDualAxis, tooltipOfDualAxisSeries],

    [
      progressive,

      barMaxWidth,
      barGapInGroup,
      stackCornerRadius,

      barStyleFilter(colorBarStyleFill(barStyle)),
      pointStyleFilter(colorPointStyleFill(pointStyle)),
      pointStyleFilter(pointStateDimensionHover),
      lineStyleFilter(colorLineStyleFill(lineStyle)),
      areaStyleFilter(colorAreaStyleFill(areaStyle)),
    ],
  ),
  xBand,
  yLinearPrimary,
  yLinearSecondary,

  colorAdapter(color, linearColorForDualAxis),
  colorAdapter(discreteLegend, colorLegend),

  backgroundColor,

  verticalCrosshairRect,
  annotationPointOfDualAxis,
  annotationVerticalLine,
  annotationHorizontalLine,
  annotationAreaBand,

  tooltipDualAxis,
]

const pivotDualAxis: PivotChartSpecPipeline = [
  initPivot,
  pivotGridStyle,
  pivotIndicatorsAsRow,
  datasetPivot,
  pivotIndicators([
    series(
      [initDualAxis, dualChartType, datasetDualAxis, labelDualAxis, tooltipOfDualAxisSeries],

      [
        progressive,

        barMaxWidth,
        barGapInGroup,
        stackCornerRadius,

        barStyleFilter(colorBarStyleFill(barStyle)),
        pointStyleFilter(colorPointStyleFill(pointStyle)),
        pointStyleFilter(pointStateDimensionHover),
        lineStyleFilter(colorLineStyleFill(lineStyle)),
        areaStyleFilter(colorAreaStyleFill(areaStyle)),
      ],
    ),
    xBand,
    yLinearPrimary,
    pivotAxisStyle(yLinearSecondary),
    colorAdapter(color, linearColor),
    backgroundColor,
    verticalCrosshairRect,
    annotationPointOfDualAxis,
    annotationVerticalLine,
    annotationHorizontalLine,
    annotationAreaBand,

    tooltipDualAxis,
  ]),
  pivotRowDimensions,
  pivotColumnDimensions,
  pivotTitle,
  colorAdapter(pivotDiscreteLegend, pivotColorLegend),
  dimensionLinkage,
]

export const dualAxisSpecPipeline = [pivotAdapter(dualAxis, pivotDualAxis)]
