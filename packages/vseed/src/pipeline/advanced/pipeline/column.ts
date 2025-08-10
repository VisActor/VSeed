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
  columnConfig,
  markStyle,
  annotation,
} from '../pipes'
import { pivotReshapeTo2D1M } from '../pipes/reshape/pivotReshapeTo2D1M'

export const columnAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  columnConfig,
  vchartBaseConfig,
  vchartTheme,
  markStyle,
  annotation,
]
