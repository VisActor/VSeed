import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeTo2D2M,
  encodingXYY,
  pivotReshapeTo2D2M,
  dualAxisConfig,
} from '../pipes'
import { autoDualMeasures } from '../pipes/init/autoDualMeasures'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoDualMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D2M], [pivotReshapeTo2D2M]),
  encodingXYY,
  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  theme,
  markStyle,
  annotation
]
