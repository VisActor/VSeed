import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingYX,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartTheme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  barParallelConfig,
  markStyle,
  annotation,
  locale,
} from '../pipes'

export const barParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingYX,
  barParallelConfig,
  vchartTheme,
  markStyle,
  annotation,
]
