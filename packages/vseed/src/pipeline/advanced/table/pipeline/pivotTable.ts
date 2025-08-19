import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import { autoPivotDimensions, autoPivotMeasures, initAdvancedVSeed, records } from '../pipes'

export const pivotTableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoPivotMeasures,
  autoPivotDimensions,
  records,
  theme,
]
