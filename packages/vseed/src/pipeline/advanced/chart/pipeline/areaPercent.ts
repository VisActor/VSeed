import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  reshapeTo2D1M,
  theme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  areaPercentConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
} from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  sortXBandAxis,
  sortLegend,
  areaPercentConfig,
  theme,
  markStyle,
  annotation
]
