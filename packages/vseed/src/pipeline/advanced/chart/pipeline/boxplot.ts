import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  sortLegend,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
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
  defaultMeasureName,
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
  pivotAdapter([reshapeWithBoxplotEncoding], [pivotReshapeWithEncoding]),

  sortLegend,
  theme,
  markStyle,
  annotation,
]
