import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  barParallelConfig,
  markStyle,
  annotation,
  sortYBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForBar,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  defaultEncodingForBar,
  deleteTooltipMeasure,
} from '../pipes'

export const barParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([defaultEncodingForBar, buildMeasures], [encodingForBar, buildMeasures, deleteTooltipMeasure]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortYBandAxis,
  sortLegend,
  barParallelConfig,
  theme,
  markStyle,
  annotation,
]
