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
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const funnelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [defaultEncodingForFunnel, buildMeasures],
    [
      encodingForFunnel,
      buildMeasures,
      deleteEncodingForMeasure(['tooltip', 'label', 'color']),
      deleteTooltipAndLabelDimension,
    ],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  funnelConfig,
  theme,
  annotation,
]
