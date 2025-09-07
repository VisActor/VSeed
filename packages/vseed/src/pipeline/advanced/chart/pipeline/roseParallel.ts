import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseParallelConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
} from '../pipes'
import { encodingForRose } from '../pipes/encoding/rose'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  encodingForRose,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  roseParallelConfig,
  theme,
  markStyle,
  annotation,
]
