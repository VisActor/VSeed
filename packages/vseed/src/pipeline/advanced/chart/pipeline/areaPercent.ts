import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaPercentConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeTo2D1M0Name,
  pivotReshapeTo2D1M0Name,
} from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M0Name], [pivotReshapeTo2D1M0Name]),
  encodingXY,
  sortXBandAxis,
  sortLegend,
  areaPercentConfig,
  theme,
  markStyle,
  annotation
]
