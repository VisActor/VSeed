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
  defaultMeasureId,
  encodingAdapter,
  defaultEncodingForScatter,
  pickDimensionsForReshape,
  regressionLine,
} from '../pipes'
import { reshapeWithScatterEncoding } from '../pipes/reshape/reshapeWithScatterEncoding'
import { pivotReshapeWithScatterEncoding } from '../pipes/reshape/pivotReshapeWithScatterEncoding'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasuresForScatter, defaultEncodingForScatter],
    [buildMeasuresForScatter, encodingForScatter, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),

  scatterConfig,
  theme,
  markStyle,
  annotation,
  regressionLine,
]
