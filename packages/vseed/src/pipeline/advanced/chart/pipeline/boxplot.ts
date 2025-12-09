import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  sortLegend,
  pivotReshapeWithBoxplotEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  pickMeasuresForReshape,
  pickDimensionsForReshape,
  defaultEncodingForBoxplot,
  encodingForBoxplot,
  reshapeWithBoxplotEncoding,
  boxplotConfig,
} from '../pipes'

export const boxplotAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  boxplotConfig,

  encodingAdapter(
    [buildMeasures, defaultEncodingForBoxplot],
    [
      buildMeasures,
      encodingForBoxplot,
      pickMeasuresForReshape(['tooltip', 'label', 'color']),
      pickDimensionsForReshape,
    ],
  ),
  pivotAdapter([reshapeWithBoxplotEncoding], [pivotReshapeWithBoxplotEncoding]),

  sortLegend,
  theme,
  markStyle,
  annotation,
]
