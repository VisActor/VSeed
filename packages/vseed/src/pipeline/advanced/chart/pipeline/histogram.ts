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
  defaultMeasureName,
  encodingAdapter,
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
  defaultEncodingForHistogram,
  encodingForHistogram,
  reshapeWithHistogramEncoding,
} from '../pipes'

export const histogramAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
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

  sortLegend,
  theme,
  markStyle,
  annotation,
]
