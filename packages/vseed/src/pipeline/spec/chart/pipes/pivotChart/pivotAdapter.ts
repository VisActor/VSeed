import type {
  PivotChartSpecPipe,
  PivotChartSpecPipeline,
  SpecPipe,
  SpecPipelineContext,
  VChartSpecPipe,
  VChartSpecPipeline,
} from 'src/types'
import type { ISpec } from '@visactor/vchart'
import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { execPipeline, isPivotChart } from '../../../../utils'

export const pivotAdapter = (pipeline: VChartSpecPipeline, pivotPipeline: PivotChartSpecPipeline): SpecPipe => {
  const adapted = ((spec: unknown, context: SpecPipelineContext) => {
    const { vseed } = context
    const usePivotChart = isPivotChart(vseed)
    if (usePivotChart) {
      return execPipeline<PivotChartConstructorOptions, SpecPipelineContext>(
        pivotPipeline,
        context,
        spec as Partial<PivotChartConstructorOptions>,
      )
    }
    return execPipeline<ISpec, SpecPipelineContext>(pipeline, context, spec as Partial<ISpec>)
  }) as VChartSpecPipe & PivotChartSpecPipe

  return adapted as unknown as SpecPipe
}
