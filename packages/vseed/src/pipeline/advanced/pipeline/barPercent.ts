import type { AdvancedPipeline } from 'src/types'
import { encodingYX, initAdvancedVSeed, reshapeTo2D1M, vchartBaseConfig } from '../pipes'

export const barPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  vchartBaseConfig,
  reshapeTo2D1M,
  encodingYX,
]
