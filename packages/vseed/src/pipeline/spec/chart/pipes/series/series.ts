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

export const seriesDualAxis = (...args: SpecPipeline[]): SpecPipe => {
  const result = {
    type: 'common',
    padding: 0,
    region: [
      {
        clip: true,
      },
    ],
  } as ICommonChartSpec

  const createDualContext = <T extends SpecPipelineContext>(context: T, index: number): T => {
    const { advancedVSeed } = context
    const dataset = advancedVSeed.dataset[index]
    return {
      ...context,
      advancedVSeed: {
        ...advancedVSeed,
        dataset: dataset,
      },
    }
  }

  return (_, context) => {
    result.series = args.map((pipeline, index) => {
      const seriesContext = createDualContext(context, index)
      return execPipeline<Spec, SpecPipelineContext>(pipeline, seriesContext, {})
    }) as ILineSeriesSpec[]

    return result
  }
}
