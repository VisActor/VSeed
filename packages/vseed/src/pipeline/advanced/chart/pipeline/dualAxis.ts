import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  encodingForDualAxis,
  reshapeWithDualEncoding,
  pivotReshapeWithDualEncoding,
  buildMeasuresForDualAxis,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  defaultEncodingForDualAxis,
} from '../pipes'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([defaultEncodingForDualAxis, buildMeasuresForDualAxis], [encodingForDualAxis, buildMeasuresForDualAxis]),
  pivotAdapter([reshapeWithDualEncoding], [pivotReshapeWithDualEncoding]),

  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  theme,
  markStyle,
  annotation,
]
