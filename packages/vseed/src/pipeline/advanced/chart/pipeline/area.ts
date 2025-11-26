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
  pickMeasuresForReshape,
  pickDimensionsForReshape,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [defaultEncodingForLine, buildMeasures],
    [encodingForLine, buildMeasures, pickMeasuresForReshape(['tooltip', 'label', 'color']), pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  areaConfig,
  theme,
  markStyle,
  annotation,
]
