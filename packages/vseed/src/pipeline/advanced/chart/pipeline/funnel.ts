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
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForFunnel,
  pickDimensionsForReshape,
} from '../pipes'

export const funnelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['size']), defaultEncodingForFunnel],
    [buildMeasures(['size']), encodingForFunnel, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  funnelConfig,
  theme,
  annotation,
]
