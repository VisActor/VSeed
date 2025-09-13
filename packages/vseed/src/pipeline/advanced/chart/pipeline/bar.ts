import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  buildMeasures,
  pivotAdapter,
  barConfig,
  markStyle,
  annotation,
  sortYBandAxis,
  sortLegend,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForBar,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
} from '../pipes'

export const barAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([encodingForBar, buildMeasures], [encodingForBar, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortYBandAxis,
  sortLegend,
  barConfig,
  theme,
  markStyle,
  annotation,
]
