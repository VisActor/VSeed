import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  histogramConfig,
  markStyle,
  annotation,
  sortLegend,
  pivotReshapeWithHistogramEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
  defaultEncodingForHistogram,
  encodingForHistogram,
  reshapeWithHistogramEncoding,
  regressionLine,
} from '../pipes'
import { histogramXAxisConfig } from '../pipes/config/histogram'

export const histogramAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  histogramConfig,

  encodingAdapter(
    [defaultEncodingForHistogram, buildMeasures],
    [
      encodingForHistogram,
      buildMeasures,
      deleteEncodingForMeasure(['tooltip', 'label', 'color']),
      deleteTooltipAndLabelDimension,
    ],
  ),
  pivotAdapter([reshapeWithHistogramEncoding], [pivotReshapeWithHistogramEncoding]),

  histogramXAxisConfig,
  sortLegend,
  theme,
  markStyle,
  annotation,
  regressionLine,
]
