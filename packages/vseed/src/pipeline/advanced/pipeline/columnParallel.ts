import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
} from '../pipes'

export const columnParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  reshapeTo2D1M,
  encodingXY,
  vchartBaseConfig,
  vchartTheme,
]
