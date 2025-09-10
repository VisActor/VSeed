import type { AdvancedPipeline } from 'src/types'
import {
  autoDimensions,
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  scatterConfig,
  encodingForScatter,
  buildMeasuresForScatter,
} from '../pipes'
import { reshapeWithScatterEncoding } from '../pipes/reshape/reshapeWithScatterEncoding'
import { pivotReshapeWithScatterEncoding } from '../pipes/reshape/pivotReshapeWithScatterEncoding'

export const scatterAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  buildMeasuresForScatter,
  autoDimensions,
  encodingForScatter,
  pivotAdapter([reshapeWithScatterEncoding], [pivotReshapeWithScatterEncoding]),
  scatterConfig,
  theme,
  markStyle,
  annotation,
]
