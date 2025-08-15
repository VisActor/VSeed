import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  vchartTheme,
  pivotAdapter,
  reshapeTo1D1M,
  pivotReshapeTo1D1M,
  encodingPie,
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
  encodingPie,
  pieConfig,
  vchartTheme,
  annotation
]
