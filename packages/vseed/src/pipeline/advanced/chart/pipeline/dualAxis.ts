import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  encodingForDualAxis,
  autoDimensions,
  autoDualMeasures,
  reshapeWithDualEncoding,
  pivotReshapeWithDualEncoding,
} from '../pipes'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoDualMeasures,
  autoDimensions,
  encodingForDualAxis,
  pivotAdapter([reshapeWithDualEncoding], [pivotReshapeWithDualEncoding]),
  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  theme,
  markStyle,
  annotation,
]
