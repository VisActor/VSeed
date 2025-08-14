import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartBaseConfig,
  vchartTheme,
  pivotAdapter,
  markStyle,
  annotation,
  locale,
  roseConfig,
  encodingRose,
} from '../pipes'
import { pivotReshapeTo2D1M } from '../pipes/reshape/pivotReshapeTo2D1M'

export const roseAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingRose,
  roseConfig,
  vchartBaseConfig,
  vchartTheme,
  markStyle,
  annotation,
]
