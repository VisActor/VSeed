import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
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
  autoMeasures,
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
