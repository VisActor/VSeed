import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  buildMeasures,
  autoDimensions,
  pivotAdapter,
  barConfig,
  markStyle,
  annotation,
  sortYBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForBar,
} from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  encodingForBar,
  buildMeasures,
  autoDimensions,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortYBandAxis,
  sortLegend,
  barConfig,
  theme,
  markStyle,
  annotation,
]
