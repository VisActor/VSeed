import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import { autoPivotDimensions, autoPivotMeasures, initAdvancedVSeed, pivotTableConfig, records } from '../pipes'
import { reshapePivotTable } from '../pipes/reshape'

export const pivotTableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoPivotMeasures,
  autoPivotDimensions,
  reshapePivotTable,
  records,
  pivotTableConfig,
  theme,
]
