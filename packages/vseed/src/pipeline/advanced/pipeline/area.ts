import type { AdvancedPipeline } from 'src/types'
import { encodingXY, initAdvancedVSeed, reshapeTo2D1M } from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, reshapeTo2D1M, encodingXY]
