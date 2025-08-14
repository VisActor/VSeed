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
  encodingPie,
  annotation,
  locale,
  donutConfig,
} from '../pipes'

export const donutAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo1D1M], [pivotReshapeTo1D1M]),
  encodingPie,
  donutConfig,
  vchartBaseConfig,
  vchartTheme,
  annotation
]
