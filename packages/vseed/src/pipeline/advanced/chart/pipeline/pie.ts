import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  pieConfig,
  annotation,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  encodingForPie,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  defaultEncodingForPie,
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const pieAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter(
    [defaultEncodingForPie, buildMeasures],
    [encodingForPie, buildMeasures, deleteEncodingForMeasure(['tooltip', 'label']), deleteTooltipAndLabelDimension],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  pieConfig,
  theme,
  annotation,
]
