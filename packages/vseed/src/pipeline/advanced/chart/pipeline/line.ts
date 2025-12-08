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
  pickMeasuresForReshape,
  pickDimensionsForReshape,
} from '../pipes'

export const lineAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures, defaultEncodingForLine],
    [buildMeasures, encodingForLine, pickMeasuresForReshape(['tooltip', 'label', 'color']), pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  lineConfig,
  theme,
  markStyle,
  annotation,
]
