import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
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
} from '../pipes'

export const barPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForBar,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortYBandAxis,
  sortLegend,
  barPercentConfig,
  theme,
  markStyle,
  annotation,
]
