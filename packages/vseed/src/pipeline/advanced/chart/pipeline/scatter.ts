import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  scatterConfig,
  encodingForScatter,
  buildMeasuresForScatter,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
} from '../pipes'
import { reshapeWithScatterEncoding } from '../pipes/reshape/reshapeWithScatterEncoding'
import { pivotReshapeWithScatterEncoding } from '../pipes/reshape/pivotReshapeWithScatterEncoding'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter([encodingForScatter, buildMeasuresForScatter], [encodingForScatter, buildMeasuresForScatter]),
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),

  scatterConfig,
  theme,
  markStyle,
  annotation,
]
