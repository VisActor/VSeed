import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  funnelConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForFunnel,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
} from '../pipes'

export const funnelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingForFunnel,
  buildMeasures,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  funnelConfig,
  theme,
  annotation,
]
