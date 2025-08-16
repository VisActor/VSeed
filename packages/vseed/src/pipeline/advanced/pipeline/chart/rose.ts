import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  reshapeTo2D1M,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  locale,
  roseConfig,
  encodingRose,
  pivotReshapeTo2D1M,
} from '../../pipes'

export const roseAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingRose,
  roseConfig,
  theme,
  markStyle,
  annotation,
]
