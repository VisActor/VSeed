import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  columnPercentConfig,
  markStyle,
  annotation,
  sortXBandAxis,
  sortLegend,
  encodingForColumn,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForColumn,
  pickMeasuresForReshape,
  pickDimensionsForReshape,
} from '../pipes'

export const columnPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures, defaultEncodingForColumn],
    [buildMeasures, encodingForColumn, pickMeasuresForReshape(['tooltip', 'label', 'color']), pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  columnPercentConfig,
  theme,
  markStyle,
  annotation,
]
