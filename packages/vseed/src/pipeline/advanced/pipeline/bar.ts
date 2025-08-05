import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, encodingYX, reshapeTo2D1M, vchartBaseConfig } from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, vchartBaseConfig, reshapeTo2D1M, encodingYX]
