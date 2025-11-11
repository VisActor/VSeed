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
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const columnParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [defaultEncodingForColumn, buildMeasures],
    [
      encodingForColumn,
      buildMeasures,
      deleteEncodingForMeasure(['tooltip', 'label', 'color']),
      deleteTooltipAndLabelDimension,
    ],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  columnParallelConfig,
  theme,
  markStyle,
  annotation,
]
