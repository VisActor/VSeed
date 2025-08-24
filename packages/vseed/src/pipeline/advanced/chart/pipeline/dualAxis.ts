import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  lineConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeTo2D2M,
  pivotReshapeTo2D1M,
  encodingXYY,
} from '../pipes'
import { autoDualMeasures } from '../pipes/init/autoDualMeasures'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoDualMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D2M], [pivotReshapeTo2D1M]),
  encodingXYY,
  sortXBandAxis,
  sortLegend,
  lineConfig,
  theme,
  markStyle,
  annotation
]
