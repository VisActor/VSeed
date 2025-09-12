import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  donutConfig,
  encodingForPie,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
} from '../pipes'

export const donutAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  buildMeasures,
  autoDimensions,
  encodingForPie,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  donutConfig,
  theme,
  annotation,
]
