import type { AdvancedPipeline } from 'src/types'
import { encodingYX, initAdvancedVSeed, reshapeTo2D1M, vchartBaseConfig, vchartTheme } from '../pipes'

export const barParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  reshapeTo2D1M,
  encodingYX,
  vchartBaseConfig,
  vchartTheme,
]
