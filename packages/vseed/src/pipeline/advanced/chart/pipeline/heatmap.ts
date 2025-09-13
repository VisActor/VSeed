import type { AdvancedPipeline } from 'src/types'
import {
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
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
} from '../pipes'

export const heatmapAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([encodingForHeatmap, buildMeasures], [encodingForHeatmap, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  heatmapConfig,
  theme,
  markStyle,
  annotation,
]
