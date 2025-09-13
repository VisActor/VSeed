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
  encodingAdapter,
  defaultEncodingForFunnel,
} from '../pipes'

export const funnelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([defaultEncodingForFunnel, buildMeasures], [encodingForFunnel, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  funnelConfig,
  theme,
  annotation,
]
