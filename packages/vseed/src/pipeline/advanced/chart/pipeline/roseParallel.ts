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
  defaultMeasures,
} from '../pipes'
import { encodingForRose } from '../pipes/encoding/rose'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  encodingForRose,
  buildMeasures,
  autoDimensions,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  roseParallelConfig,
  theme,
  markStyle,
  annotation,
]
