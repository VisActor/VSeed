import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseParallelConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  encodingForRose,
  defaultEncodingForRose,
  pickMeasuresForReshape,
  pickDimensionsForReshape,
} from '../pipes'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures, defaultEncodingForRose],
    [buildMeasures, encodingForRose, pickMeasuresForReshape(['tooltip', 'label', 'color']), pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  roseParallelConfig,
  theme,
  markStyle,
  annotation,
]
