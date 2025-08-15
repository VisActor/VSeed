import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  encodingXY,
  initAdvancedVSeed,
  reshapeTo2D1M,
  vchartTheme,
  pivotAdapter,
  columnConfig,
  markStyle,
  annotation,
  locale,
} from '../pipes'
import { pivotReshapeTo2D1M } from '../pipes/reshape/pivotReshapeTo2D1M'

export const columnAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo2D1M], [pivotReshapeTo2D1M]),
  encodingXY,
  columnConfig,
  vchartTheme,
  markStyle,
  annotation,
]
