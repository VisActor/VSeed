import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  encodingYX,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
  autoMeasures,
  autoDimensions,
} from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  reshapeTo2D1M,
  encodingYX,
  vchartBaseConfig,
  vchartTheme,
]
