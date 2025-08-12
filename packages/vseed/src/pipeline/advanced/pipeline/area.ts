import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  pivotReshapeTo2D1M,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
  pivotAdapter,
  areaConfig,
  annotation,
  markStyle,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  areaConfig,
  vchartBaseConfig,
  vchartTheme,
  markStyle,
  annotation
]
