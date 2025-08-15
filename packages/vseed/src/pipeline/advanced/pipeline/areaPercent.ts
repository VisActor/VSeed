import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartTheme,
  pivotAdapter,
  pivotReshapeTo2D1M,
  areaPercentConfig,
  annotation,
  markStyle,
  locale,
} from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  areaPercentConfig,
  vchartTheme,
  markStyle,
  annotation
]
