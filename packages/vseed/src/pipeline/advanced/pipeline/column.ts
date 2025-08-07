import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
  pivotAdapter,
} from '../pipes'
import { reshapePivotTo2D1M } from '../pipes/reshape/reshapePivotTo2D1M'

export const columnAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [reshapePivotTo2D1M]),
  encodingXY,
  vchartBaseConfig,
  vchartTheme,
]
