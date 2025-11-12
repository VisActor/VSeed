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
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
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
    [defaultEncodingForBoxplot, buildMeasures],
    [
      encodingForBoxplot,
      buildMeasures,
      deleteEncodingForMeasure(['tooltip', 'label', 'color']),
      deleteTooltipAndLabelDimension,
    ],
  ),
  pivotAdapter([reshapeWithBoxplotEncoding], [pivotReshapeWithBoxplotEncoding]),

  sortLegend,
  theme,
  markStyle,
  annotation,
]
