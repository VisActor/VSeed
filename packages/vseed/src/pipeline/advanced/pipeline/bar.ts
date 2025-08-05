import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, encodingYX, reshapeTo2D1M, vchartBaseConfig, vchartTheme } from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  reshapeTo2D1M,
  encodingYX,
  vchartBaseConfig,
  vchartTheme,
]
