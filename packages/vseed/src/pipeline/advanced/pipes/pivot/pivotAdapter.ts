import type { AdvancedPipe, AdvancedPipeline, AdvancedPipelineContext, AdvancedVSeed } from 'src/types'
import { execPipeline, isPivotChart } from '../../../utils'

export const pivotAdapter = (pipeline: AdvancedPipeline, pivotPipeline: AdvancedPipeline): AdvancedPipe => {
  return (advancedVSeed, context) => {
    const { vseed } = context
    const usePivotChart = isPivotChart(vseed)

    if (usePivotChart) {
      return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(pivotPipeline, context, advancedVSeed)
    }

    return execPipeline<AdvancedVSeed, AdvancedPipelineContext>(pipeline, context, advancedVSeed)
  }
}
