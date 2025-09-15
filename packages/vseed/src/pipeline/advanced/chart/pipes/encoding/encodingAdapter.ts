import type {
  AdvancedPipe,
  AdvancedPipeline,
  AdvancedPipelineContext,
  AdvancedVSeed,
  Dimension,
  Measure,
} from 'src/types'
import { execPipeline } from 'src/pipeline/utils'

export const encodingAdapter = (
  noEncodingPipeline: AdvancedPipeline,
  hasEncodingPipeline: AdvancedPipeline,
): AdvancedPipe => {
  return (advancedVSeed, context) => {
    const { dimensions = [], measures = [] } = advancedVSeed
    const hasDimensionEncoding = dimensions.some((item: Dimension) => item.encoding)
    const hasMeasureEncoding = measures.some((item: Measure) => item.encoding)

    const hasEncoding = hasDimensionEncoding || hasMeasureEncoding

    if (hasEncoding) {
      return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(hasEncodingPipeline, context, advancedVSeed)
    }
    return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(noEncodingPipeline, context, advancedVSeed)
  }
}
