import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  columnParallelConfig,
  markStyle,
  annotation,
  sortXBandAxis,
  sortLegend,
  encodingForColumn,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
} from '../pipes'

export const columnParallelAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingForColumn,
  buildMeasures,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  columnParallelConfig,
  theme,
  markStyle,
  annotation,
]
