import type { AdvancedPipeline } from 'src/types'
import { initAdvancedVSeed, autoDimensions, autoMeasures, records, tableConfig } from '../pipes'
import { theme } from '../../chart/pipes'

export const tableAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  records,
  tableConfig,
  theme,
]
