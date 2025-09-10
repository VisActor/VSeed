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
  buildMeasures,
  autoDimensions,
  encodingForBar,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortYBandAxis,
  sortLegend,
  barConfig,
  theme,
  markStyle,
  annotation,
]
