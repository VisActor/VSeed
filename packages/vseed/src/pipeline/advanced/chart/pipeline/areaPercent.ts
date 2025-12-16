import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaPercentConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  encodingForLine,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForLine,
  pickDimensionsForReshape,
} from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
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
  areaPercentConfig,
  theme,
  markStyle,
  annotation,
]
