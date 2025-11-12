import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import {
  cellStyle,
  defaultDimensions,
  defaultMeasureId,
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
  defaultMeasureId,
  cellStyle,

  encodingForPivotTable,
  reshapePivotTable,
  pivotTableConfig,
  theme,
]
