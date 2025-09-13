import type { AdvancedPipeline } from 'src/types'
import {
  buildMeasures,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  barPercentConfig,
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

export const barPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([encodingForBar, buildMeasures], [encodingForBar, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortYBandAxis,
  sortLegend,
  barPercentConfig,
  theme,
  markStyle,
  annotation,
]
