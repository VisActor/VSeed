import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseParallelConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
} from '../pipes'
import { encodingForRose } from '../pipes/encoding/rose'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForRose,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  roseParallelConfig,
  theme,
  markStyle,
  annotation,
]
