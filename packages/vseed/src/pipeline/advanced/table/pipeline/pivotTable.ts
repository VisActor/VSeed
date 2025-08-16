import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import { autoDimensions, autoMeasures, initAdvancedVSeed, records } from '../pipes'

export const pivotTableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  records,
  theme,
]
