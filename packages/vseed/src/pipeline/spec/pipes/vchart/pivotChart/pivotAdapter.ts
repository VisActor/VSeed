import type { Spec, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { execPipeline, isPivotChart } from '../../../../utils'

export const pivotAdapter = (pipeline: SpecPipeline, pivotPipeline: SpecPipeline): SpecPipe => {
  return (spec, context) => {
    const { vseed } = context
    const usePivotChart = isPivotChart(vseed)

    if (usePivotChart) {
      return execPipeline<Spec, SpecPipelineContext>(pivotPipeline, context, spec)
    }

    return execPipeline<Spec, SpecPipelineContext>(pipeline, context, spec)
  }
}
