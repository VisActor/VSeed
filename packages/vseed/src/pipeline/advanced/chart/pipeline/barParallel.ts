import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
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
} from '../pipes'

export const barParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForBar,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortYBandAxis,
  sortLegend,
  barParallelConfig,
  theme,
  markStyle,
  annotation,
]
