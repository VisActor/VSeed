import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  encodingForDualAxis,
  reshapeWithDualEncoding,
  pivotReshapeWithDualEncoding,
  buildMeasuresForDualAxis,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForDualAxis,
  pickMeasuresForReshape,
  pickDimensionsForReshape,
} from '../pipes'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [defaultEncodingForDualAxis, buildMeasuresForDualAxis],
    [
      encodingForDualAxis,
      buildMeasuresForDualAxis,
      pickMeasuresForReshape(['tooltip', 'label', 'color']),
      pickDimensionsForReshape,
    ],
  ),
  pivotAdapter([reshapeWithDualEncoding], [pivotReshapeWithDualEncoding]),

  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  theme,
  markStyle,
  annotation,
]
