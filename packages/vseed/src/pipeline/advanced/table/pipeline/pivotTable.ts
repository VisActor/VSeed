import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import {
  cellStyle,
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
  cellStyle,

  encodingForPivotTable,
  reshapePivotTable,
  pivotTableConfig,
  theme,
]
