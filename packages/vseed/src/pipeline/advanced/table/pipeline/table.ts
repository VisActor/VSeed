import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, records, tableConfig, defaultMeasures, defaultDimensions, cellStyle } from '../pipes'
import { theme } from '../../chart/pipes'

export const tableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  cellStyle,

  records,
  tableConfig,
  theme,
]
