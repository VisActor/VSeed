import type { AdvancedPipeline } from 'src/types'
import { encodingXY, initAdvancedVSeed, reshapeTo2D1M } from '../pipes'
import { vchartBaseConfig } from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  vchartBaseConfig,
  reshapeTo2D1M,
  encodingXY,
]
