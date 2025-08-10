import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  vchartBaseConfig,
  vchartTheme,
  reshapeTo2D1M,
  pivotReshapeTo2D1M,
  pivotAdapter,
  columnPercentConfig,
  markStyle,
  annotation,
} from '../pipes'

export const columnPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  columnPercentConfig,
  vchartBaseConfig,
  vchartTheme,
  markStyle,
  annotation,
]
