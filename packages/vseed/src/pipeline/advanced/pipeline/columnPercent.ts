import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  vchartTheme,
  reshapeTo2D1M,
  pivotReshapeTo2D1M,
  pivotAdapter,
  columnPercentConfig,
  markStyle,
  annotation,
  locale,
} from '../pipes'

export const columnPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  columnPercentConfig,
  vchartTheme,
  markStyle,
  annotation,
]
