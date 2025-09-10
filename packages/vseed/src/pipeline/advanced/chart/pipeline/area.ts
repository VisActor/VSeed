import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForColumn,
  buildMeasures,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForColumn,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  sortLegend,
  areaConfig,
  theme,
  markStyle,
  annotation,
]
