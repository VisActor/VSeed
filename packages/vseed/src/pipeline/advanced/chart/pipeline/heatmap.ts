import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  reshapeTo2D1M,
  theme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  annotation,
  markStyle,
  sortXBandAxis,
  heatmapConfig,
} from '../pipes'
import { encodingMatrix } from '../pipes/encoding/encodingMatrix'

export const heatmapAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingMatrix,
  sortXBandAxis,
  heatmapConfig,
  theme,
  markStyle,
  annotation
]
