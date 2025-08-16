import type { AdvancedPipeline } from 'src/types'
import { autoDimensions, autoMeasures, initAdvancedVSeed } from '../../chart/pipes'

export const pivotTableAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, autoMeasures, autoDimensions]
