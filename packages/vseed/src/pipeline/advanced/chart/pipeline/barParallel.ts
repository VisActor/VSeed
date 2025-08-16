import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingYX,
  initAdvancedVSeed,
  reshapeTo2D1M,
  theme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  barParallelConfig,
  markStyle,
  annotation,
} from '../pipes'

export const barParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingYX,
  barParallelConfig,
  theme,
  markStyle,
  annotation,
]
