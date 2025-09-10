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
  reshapeWithDualEncoding,
  pivotReshapeWithDualEncoding,
  buildMeasuresForDualAxis,
} from '../pipes'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasuresForDualAxis,
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
