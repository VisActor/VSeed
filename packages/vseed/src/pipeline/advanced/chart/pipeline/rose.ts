import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
} from '../pipes'
import { encodingForRose } from '../pipes/encoding/initEncoding/rose'

export const roseAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  encodingForRose,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  roseConfig,
  theme,
  markStyle,
  annotation,
]
