import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  donutConfig,
  encodingForPie,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
} from '../pipes'

export const donutAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  encodingForPie,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  donutConfig,
  theme,
  annotation,
]
