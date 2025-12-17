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
    [buildMeasures(['value', 'x0', 'x1', 'yAxis', 'detail']), defaultEncodingForHistogram],
    [buildMeasures(['value', 'x0', 'x1', 'yAxis', 'detail']), encodingForHistogram, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithHistogramEncoding], [pivotReshapeWithHistogramEncoding]),

  histogramXAxisConfig,
  sortLegend,
  theme,
  markStyle,
  annotation,
  regressionLine,
]
