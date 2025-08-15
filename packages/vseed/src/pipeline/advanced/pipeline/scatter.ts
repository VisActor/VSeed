import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  autoMeasures,
  initAdvancedVSeed,
  vchartTheme,
  pivotAdapter,
  annotation,
  markStyle,
  locale,
  scatterConfig,
  reshapeTo1D2M,
  pivotReshapeTo1D2M,
} from '../pipes'
import { encodingYY } from '../pipes/encoding/encodingYY'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  locale,
  autoMeasures,
  autoDimensions,
  pivotAdapter([reshapeTo1D2M], [pivotReshapeTo1D2M]),
  encodingYY,
  scatterConfig,
  vchartTheme,
  markStyle,
  annotation,
]
