import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  encodingForLine,
  defaultMeasures,
  defaultMeasureId,
  defaultDimensions,
  encodingAdapter,
  defaultEncodingForLine,
  pickDimensionsForReshape,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['yAxis', 'detail']), defaultEncodingForLine],
    [buildMeasures(['yAxis', 'detail']), encodingForLine, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  areaConfig,
  theme,
  markStyle,
  annotation,
]
