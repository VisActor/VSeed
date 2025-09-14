import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  areaPercentConfig,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  encodingForLine,
  reshapeWithEncoding,
  pivotReshapeWithEncoding,
  buildMeasures,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  defaultEncodingForLine,
  deleteTooltipAndLabelMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const areaPercentAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter(
    [defaultEncodingForLine, buildMeasures],
    [encodingForLine, buildMeasures, deleteTooltipAndLabelMeasure, deleteTooltipAndLabelDimension],
  ),
  pivotAdapter([reshapeWithEncoding], [pivotReshapeWithEncoding]),

  sortXBandAxis,
  sortLegend,
  areaPercentConfig,
  theme,
  markStyle,
  annotation,
]
