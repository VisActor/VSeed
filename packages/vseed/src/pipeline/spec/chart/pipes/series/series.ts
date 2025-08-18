import type { Spec, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../../../utils'
import type { ICommonChartSpec, ILineSeriesSpec } from '@visactor/vchart'

export const series = (...args: SpecPipeline[]): SpecPipe => {
  const result = {
    type: 'common',
    padding: 0,
    region: [
      {
        clip: true,
      },
    ],
  } as ICommonChartSpec

  return (_, context) => {
    result.series = args.map((pipeline) => {
      return execPipeline<Spec, SpecPipelineContext>(pipeline, context, {})
    }) as ILineSeriesSpec[]

    return result
  }
}
