import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  columnParallelConfig,
  markStyle,
  annotation,
} from '../pipes'

export const columnParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  columnParallelConfig,
  vchartBaseConfig,
  vchartTheme,
  markStyle,
  annotation,
]
