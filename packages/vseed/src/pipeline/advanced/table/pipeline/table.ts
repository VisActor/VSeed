import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, records, tableConfig, defaultMeasures, defaultDimensions, cellStyle, page } from '../pipes'
import { theme } from '../../chart/pipes'

export const tableAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  cellStyle,

  records,
  tableConfig,
  theme,
]
