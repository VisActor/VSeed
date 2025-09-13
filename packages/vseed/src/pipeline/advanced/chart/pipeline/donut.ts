import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  donutConfig,
  encodingForPie,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
} from '../pipes'

export const donutAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([encodingForPie, buildMeasures], [encodingForPie, buildMeasures]),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  donutConfig,
  theme,
  annotation,
]
