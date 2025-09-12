import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, records, tableConfig, defaultMeasures, defaultDimensions } from '../pipes'
import { theme } from '../../chart/pipes'

export const tableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,

  records,
  tableConfig,
  theme,
]
