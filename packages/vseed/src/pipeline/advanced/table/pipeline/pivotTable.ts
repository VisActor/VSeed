import type { AdvancedPipeline } from 'src/types'
import { theme } from '../../chart/pipes'
import {
  cellStyle,
  defaultDimensions,
  defaultMeasureId,
  defaultMeasures,
  encodingForPivotTable,
  initAdvancedVSeed,
  page,
  pivotTableConfig,
  reshapePivotTable,
} from '../pipes'

export const pivotTableAdvancedPipeline: AdvancedPipeline = [
  page,
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
