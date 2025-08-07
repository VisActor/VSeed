import type { AdvancedPipe, AdvancedPipeline, AdvancedPipelineContext, AdvancedVSeed, MeasureGroup } from 'src/types'
import { execPipeline } from '../../../utils'

export const pivotAdapter = (pipeline: AdvancedPipeline, pivotPipeline: AdvancedPipeline): AdvancedPipe => {
  return (advancedVSeed, context) => {
    const { vseed } = context
    const { measures } = vseed

    if (measures && measures.find((measure: MeasureGroup) => measure && measure.children)) {
      return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(pivotPipeline, context, advancedVSeed)
    }

    return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(pipeline, context, advancedVSeed)
  }
}
