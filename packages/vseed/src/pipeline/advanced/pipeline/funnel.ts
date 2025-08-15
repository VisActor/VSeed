import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  reshapeTo1D1M,
  pivotReshapeTo1D1M,
  annotation,
  locale,
  encodingFunnel,
  funnelConfig,
} from '../pipes'

export const funnelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo1D1M], [pivotReshapeTo1D1M]),
  encodingFunnel,
  funnelConfig,
  theme,
  annotation,
]
