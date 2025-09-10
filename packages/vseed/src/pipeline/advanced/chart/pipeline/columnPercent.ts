import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  columnPercentConfig,
  markStyle,
  annotation,
  sortXBandAxis,
  sortLegend,
  encodingForColumn,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
} from '../pipes'

export const columnPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasures,
  autoDimensions,
  encodingForColumn,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  sortLegend,
  columnPercentConfig,
  theme,
  markStyle,
  annotation,
]
