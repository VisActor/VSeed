import type { AdvancedPipeline } from 'src/types'
import { reshapeTo2D1M } from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [reshapeTo2D1M]
