import type { AdvancedPipeline } from 'src/types'
import { encodingXY, initAdvancedVSeed, reshapeTo2D1M, vchartBaseConfig } from '../pipes'

export const lineAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, vchartBaseConfig, reshapeTo2D1M, encodingXY]
