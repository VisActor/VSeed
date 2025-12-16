import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  barParallelConfig,
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

export const barParallelAdvancedPipeline: AdvancedPipeline = [
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
  barParallelConfig,
  theme,
  markStyle,
  annotation,
]
