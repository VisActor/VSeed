import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  pivotReshapeTo2D1M,
  reshapeTo2D1M,
  vchartTheme,
  pivotAdapter,
  areaConfig,
  annotation,
  markStyle,
  locale,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  areaConfig,
  vchartTheme,
  markStyle,
  annotation,
]
