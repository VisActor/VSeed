import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  columnConfig,
  markStyle,
  annotation,
  sortXBandAxis,
  sortLegend,
  encodingForColumn,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
} from '../pipes'

export const columnAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  encodingForColumn,
  buildMeasures,
  autoDimensions,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  sortLegend,
  columnConfig,
  theme,
  markStyle,
  annotation,
]
