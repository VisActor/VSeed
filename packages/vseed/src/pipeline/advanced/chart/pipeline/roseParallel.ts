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
  defaultMeasureName,
  encodingAdapter,
  encodingForRose,
  defaultEncodingForRose,
} from '../pipes'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([defaultEncodingForRose, buildMeasures], [encodingForRose, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  roseParallelConfig,
  theme,
  markStyle,
  annotation,
]
