import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  encodingYX,
  theme,
  autoMeasures,
  autoDimensions,
  reshapeTo2D1M,
  pivotReshapeTo2D1M,
  pivotAdapter,
  barConfig,
  markStyle,
  annotation,
  sortYBandAxis,
  sortLegend,
} from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingYX,
  sortYBandAxis,
  sortLegend,
  barConfig,
  theme,
  markStyle,
  annotation,
]
