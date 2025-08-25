import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaConfig,
  annotation,
  sortXBandAxis,
  autoMeasuresBy2M1Group,
  encodingAreaRange,
  reshapeTo1D,
  pivotReshapeTo1D,
  markStyle,
} from '../pipes'

export const areaRangeAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  autoMeasuresBy2M1Group,
  autoDimensions,
  pivotAdapter([reshapeTo1D], [pivotReshapeTo1D]),
  encodingAreaRange,
  sortXBandAxis,
  areaConfig,
  theme,
  markStyle,
  annotation,
]
