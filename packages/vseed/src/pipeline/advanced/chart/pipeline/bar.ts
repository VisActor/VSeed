import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  buildMeasures,
  pivotAdapter,
  barConfig,
  markStyle,
  annotation,
  sortYBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForBar,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForBar,
  pickDimensionsForReshape,
} from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['xAxis']), defaultEncodingForBar],
    [buildMeasures(['xAxis']), encodingForBar, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortYBandAxis,
  sortLegend,
  barConfig,
  theme,
  markStyle,
  annotation,
]
