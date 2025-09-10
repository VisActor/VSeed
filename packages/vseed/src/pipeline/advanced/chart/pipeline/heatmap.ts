import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
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
  buildMeasures,
} from '../pipes'

export const heatmapAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForHeatmap,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  heatmapConfig,
  theme,
  markStyle,
  annotation
]
