import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  encodingYX,
  vchartBaseConfig,
  vchartTheme,
  autoMeasures,
  autoDimensions,
  reshapeTo2D1M,
  pivotReshapeTo2D1M,
  pivotAdapter,
  barConfig,
  markStyle,
  annotation,
} from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingYX,
  barConfig,
  vchartBaseConfig,
  vchartTheme,
  markStyle,
  annotation,
]
