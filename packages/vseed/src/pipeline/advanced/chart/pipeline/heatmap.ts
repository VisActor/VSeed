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
  defaultMeasures,
} from '../pipes'

export const heatmapAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  encodingForHeatmap,
  buildMeasures,
  autoDimensions,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  heatmapConfig,
  theme,
  markStyle,
  annotation
]
