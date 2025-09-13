import type { AdvancedPipeline } from 'src/types'
import {
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
  buildMeasures,
  encodingForLine,
  defaultMeasures,
  defaultMeasureName,
  defaultDimensions,
  encodingAdapter,
} from '../pipes'

export const areaAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([encodingForLine, buildMeasures], [encodingForLine, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  areaConfig,
  theme,
  markStyle,
  annotation,
]
