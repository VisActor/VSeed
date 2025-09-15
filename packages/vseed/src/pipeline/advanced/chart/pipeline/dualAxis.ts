import type { AdvancedPipeline } from 'src/types'
import {
  initAdvancedVSeed,
  theme,
  pivotAdapter,
  annotation,
  markStyle,
  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  encodingForDualAxis,
  reshapeWithDualEncoding,
  pivotReshapeWithDualEncoding,
  buildMeasuresForDualAxis,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,
  encodingAdapter,
  defaultEncodingForDualAxis,
  deleteTooltipAndLabelMeasure,
  deleteTooltipAndLabelDimension,
} from '../pipes'

export const dualAxisAdvancedPipeline: AdvancedPipeline = [
  initAdvancedVSeed,
  defaultMeasures,
  defaultDimensions,
  defaultMeasureName,

  encodingAdapter(
    [defaultEncodingForDualAxis, buildMeasuresForDualAxis],
    [encodingForDualAxis, buildMeasuresForDualAxis, deleteTooltipAndLabelMeasure, deleteTooltipAndLabelDimension],
  ),
  pivotAdapter([reshapeWithDualEncoding], [pivotReshapeWithDualEncoding]),

  sortXBandAxis,
  sortLegend,
  dualAxisConfig,
  theme,
  markStyle,
  annotation,
]
