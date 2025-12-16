import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  lineConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForLine,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForLine,
  pickDimensionsForReshape,
} from '../pipes'

export const lineAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['yAxis']), defaultEncodingForLine],
    [buildMeasures(['yAxis']), encodingForLine, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  lineConfig,
  theme,
  markStyle,
  annotation,
]
