import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortLegend,
  radarConfig,
  encodingForRadar,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  defaultEncodingForRadar,
  deleteTooltipMeasure,
} from '../pipes'

export const radarAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([defaultEncodingForRadar, buildMeasures], [encodingForRadar, buildMeasures, deleteTooltipMeasure]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  // sortXBandAxis,
  sortLegend,
  radarConfig,
  theme,
  markStyle,
  annotation,
]
