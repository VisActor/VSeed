import type { Spec, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { execPipeline, isPivotChart } from '../../../../utils'
import type { PivotChartConstructorOptions } from '@visactor/vtable'

export const pivotAdapter = <T extends Spec, U extends PivotChartConstructorOptions>(
  pipeline: SpecPipeline<T>,
  pivotPipeline: SpecPipeline<U>,
): SpecPipe<T | U> => {
  return (spec, context) => {
    const { vseed } = context
    const usePivotChart = isPivotChart(vseed)

    if (usePivotChart) {
      return execPipeline<U, SpecPipelineContext>(pivotPipeline, context, spec as U)
    }

    return execPipeline<T, SpecPipelineContext>(pipeline, context, spec as T)
  }
}
