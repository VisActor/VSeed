import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
} from '../pipes'
import { encodingForRose } from '../pipes/encoding/rose'

export const roseAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  encodingForRose,
  buildMeasures,
  autoDimensions,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  roseConfig,
  theme,
  markStyle,
  annotation,
]
