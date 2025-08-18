import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  lineConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeTo2D1M0Name,
  pivotReshapeTo2D1M0Name,
} from '../pipes'

export const lineAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M0Name], [pivotReshapeTo2D1M0Name]),
  encodingXY,
  sortXBandAxis,
  sortLegend,
  lineConfig,
  theme,
  markStyle,
  annotation
]
