import type { AdvancedPipeline } from 'src/types'
import { encodingCartesian, reshapeTo2D1M } from '../pipes'

export const columnAdvancedPipeline: AdvancedPipeline = [reshapeTo2D1M, encodingCartesian]
