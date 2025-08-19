import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  theme,
  reshapeTo2D1M,
  pivotReshapeTo2D1M,
  pivotAdapter,
  columnPercentConfig,
  markStyle,
  annotation,
  sortXBandAxis,
  sortLegend,
} from '../pipes'

export const columnPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  sortXBandAxis,
  sortLegend,
  columnPercentConfig,
  theme,
  markStyle,
  annotation,
]
