import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingYX,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
  pivotAdapter,
  pivotReshapeTo2D1M
} from '../pipes'

export const barPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingYX,
  vchartBaseConfig,
  vchartTheme,
]
