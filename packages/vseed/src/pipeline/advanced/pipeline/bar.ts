import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, encodingYX, reshapeTo2D1M } from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, reshapeTo2D1M, encodingYX]
