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
  encodingAdapter,
  pickMeasuresForReshape,
  pickDimensionsForReshape,
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
  histogramConfig,

  encodingAdapter(
    [defaultEncodingForHistogram, buildMeasures],
    [
      encodingForHistogram,
      buildMeasures,
      pickMeasuresForReshape(['tooltip', 'label', 'color']),
      pickDimensionsForReshape,
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
