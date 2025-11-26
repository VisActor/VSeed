import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  barPercentConfig,
  markStyle,
  annotation,
  sortYBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForBar,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForBar,
  pickMeasuresForReshape,
  pickDimensionsForReshape,
} from '../pipes'

export const barPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [defaultEncodingForBar, buildMeasures],
    [encodingForBar, buildMeasures, pickMeasuresForReshape(['tooltip', 'label', 'color']), pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortYBandAxis,
  sortLegend,
  barPercentConfig,
  theme,
  markStyle,
  annotation,
]
