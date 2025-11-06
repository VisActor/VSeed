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
  defaultEncodingForScatter,
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
  regressionLine,
} from '../pipes'
import { reshapeWithScatterEncoding } from '../pipes/reshape/reshapeWithScatterEncoding'
import { pivotReshapeWithScatterEncoding } from '../pipes/reshape/pivotReshapeWithScatterEncoding'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter(
    [defaultEncodingForScatter, buildMeasuresForScatter],
    [
      encodingForScatter,
      buildMeasuresForScatter,
      deleteEncodingForMeasure(['tooltip', 'label', 'size']),
      deleteTooltipAndLabelDimension,
    ],
  ),
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),

  scatterConfig,
  theme,
  markStyle,
  annotation,
  regressionLine,
]
