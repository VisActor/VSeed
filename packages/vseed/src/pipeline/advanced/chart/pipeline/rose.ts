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
  buildMeasures,
  autoDimensions,
  encodingForRose,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  roseConfig,
  theme,
  markStyle,
  annotation,
]
