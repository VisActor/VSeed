import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import {
  defaultDimensions,
  defaultMeasureName,
  defaultMeasures,
  encodingForPivotTable,
  initAdvancedVSeed,
  pivotTableConfig,
  reshapePivotTable,
} from '../pipes'

export const pivotTableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingForPivotTable,
  reshapePivotTable,
  pivotTableConfig,
  theme,
]
