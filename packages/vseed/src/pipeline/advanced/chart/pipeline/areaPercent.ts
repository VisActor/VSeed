import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaPercentConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  encodingForLine,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
} from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  encodingForLine,
  buildMeasures,
  autoDimensions,
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),
  sortXBandAxis,
  sortLegend,
  areaPercentConfig,
  theme,
  markStyle,
  annotation,
]
