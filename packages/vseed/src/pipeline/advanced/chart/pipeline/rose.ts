import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  markStyle,
  annotation,
  roseConfig,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  encodingForRose,
  defaultEncodingForRose,
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const roseAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter(
    [defaultEncodingForRose, buildMeasures],
    [encodingForRose, buildMeasures, deleteEncodingForMeasure(['tooltip', 'label']), deleteTooltipAndLabelDimension],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  roseConfig,
  theme,
  markStyle,
  annotation,
]
