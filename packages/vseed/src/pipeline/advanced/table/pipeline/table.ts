import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, autoDimensions, autoMeasures, records } from '../pipes'
import { theme } from '../../chart/pipes'

export const tableAdvancedPipeline: AdvancedPipeline = [initAdvancedVSeed, autoMeasures, autoDimensions, records, theme]
