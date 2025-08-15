import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartTheme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  markStyle,
  annotation,
  locale,
  roseParallelConfig,
  encodingRose,
} from '../pipes'

export const roseParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingRose,
  roseParallelConfig,
  vchartTheme,
  markStyle,
  annotation,
]
