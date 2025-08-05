import type { AdvancedPipeline } from 'src/types'
import { encodingXY, initAdvancedVSeed, reshapeTo2D1M, vchartBaseConfig, vchartTheme } from '../pipes'

export const lineAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  reshapeTo2D1M,
  encodingXY,
  vchartBaseConfig,
  vchartTheme,
]
