import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  columnParallelConfig,
  markStyle,
  annotation,
  sortXBandAxis,
  sortLegend,
  encodingForColumn,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForColumn,
  pickDimensionsForReshape,
} from '../pipes'

export const columnParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasures(['yAxis']), defaultEncodingForColumn],
    [buildMeasures(['yAxis']), encodingForColumn, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  columnParallelConfig,
  theme,
  markStyle,
  annotation,
]
