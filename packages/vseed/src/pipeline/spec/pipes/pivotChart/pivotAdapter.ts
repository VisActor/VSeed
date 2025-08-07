import type { MeasureGroup, Spec, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../../utils'

export const pivotAdapter = (pipeline: SpecPipeline, pivotPipeline: SpecPipeline): SpecPipe => {
  return (spec, context) => {
    const { advancedVSeed } = context
    const { measures } = advancedVSeed

    if (measures && measures.find((measure: MeasureGroup) => measure && measure.children)) {
      return execPipeline<Spec, SpecPipelineContext>(pivotPipeline, context, spec)
    }

    return execPipeline<Spec, SpecPipelineContext>(pipeline, context, spec)
  }
}
