import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortXBandAxis,
  heatmapConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForHeatmap,
} from '../pipes'

export const heatmapAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  encodingForHeatmap,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  heatmapConfig,
  theme,
  markStyle,
  annotation
]
