import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortLegend,
  radarConfig,
  encodingAR,
  reshapeTo2D1M0Name,
  pivotReshapeTo2D1M0Name,
} from '../pipes'

export const radarAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M0Name], [pivotReshapeTo2D1M0Name]),
  encodingAR,
  // sortXBandAxis,
  sortLegend,
  radarConfig,
  theme,
  markStyle,
  annotation,
]
