import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  vchartBaseConfig,
  vchartTheme,
  pivotAdapter,
  reshapeTo1D1M,
  pivotReshapeTo1D1M,
  encodingPolar,
  pieConfig,
  annotation,
  locale,
} from '../pipes'

export const pieAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo1D1M], [pivotReshapeTo1D1M]),
  encodingPolar,
  pieConfig,
  vchartBaseConfig,
  vchartTheme,
  annotation
]
