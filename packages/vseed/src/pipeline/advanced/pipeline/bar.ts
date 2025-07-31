import type { AdvancedPipeline } from 'src/types'
import { reshape } from '../pipes/reshape/reshape'

export const barAdvancedPipeline: AdvancedPipeline = [reshape]
