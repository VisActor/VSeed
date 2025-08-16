import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  scatterConfig,
  reshapeTo1D2M,
  pivotReshapeTo1D2M,
  encodingYY,
} from '../pipes'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo1D2M], [pivotReshapeTo1D2M]),
  encodingYY,
  scatterConfig,
  theme,
  markStyle,
  annotation,
]
