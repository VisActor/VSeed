import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, autoDimensions, autoMeasures } from '../pipes'

export const tableAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, autoMeasures, autoDimensions]
