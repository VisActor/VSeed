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
  defaultEncodingForPie,
  deleteEncodingForMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const donutAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter(
    [defaultEncodingForPie, buildMeasures],
    [encodingForPie, buildMeasures, deleteEncodingForMeasure(['tooltip', 'label']), deleteTooltipAndLabelDimension],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  donutConfig,
  theme,
  annotation,
]
