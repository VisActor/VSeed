import type { Spec, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { execPipeline } from '../../../../utils'
import type { ICommonChartSpec, ILineSeriesSpec } from '@visactor/vchart'

export const series = (...args: SpecPipeline<Spec>[]): SpecPipe<Spec> => {
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

/**
 * @description 双轴图的透视场景, 不能使用此pipe, 请使用series
 * 因为VTable.PivotVChart会自行解析数据, 而非VChart解析.
 */
export const seriesDualAxis = (...args: SpecPipeline<Spec>[]): SpecPipe<Spec> => {
  const result = {
    type: 'common',
    padding: 0,
    labelLayout: 'region',
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
