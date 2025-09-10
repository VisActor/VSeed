import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  pieConfig,
  annotation,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForPie,
  buildMeasures,
} from '../pipes'

export const pieAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForPie,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  pieConfig,
  theme,
  annotation,
]
