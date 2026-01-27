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
  addPivotDimensionsForScatter,
  page,
} from '../pipes'
import { reshapeWithScatterEncoding } from '../pipes/reshape/reshapeWithScatterEncoding'
import { pivotReshapeWithScatterEncoding } from '../pipes/reshape/pivotReshapeWithScatterEncoding'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  page,
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureId,

  encodingAdapter(
    [buildMeasuresForScatter, addPivotDimensionsForScatter, defaultEncodingForScatter],
    [buildMeasuresForScatter, addPivotDimensionsForScatter, encodingForScatter, pickDimensionsForReshape],
  ),
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),

  scatterConfig,
  theme,
  markStyle,
  annotation,
  regressionLine,
]
