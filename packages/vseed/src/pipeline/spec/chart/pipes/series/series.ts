import type { SpecPipelineContext, VChartSpecPipe, VChartSpecPipeline } from 'src/types'
import { execPipeline } from '../../../../utils'
import type { ICommonChartSpec, ILineSeriesSpec, ISpec } from '@visactor/vchart'

export const series = (...args: VChartSpecPipeline[]): VChartSpecPipe => {
  const result = {
    type: 'common',
    padding: 0,
    region: [
      {
        clip: true,
      },
    ],
  } as ICommonChartSpec

  return (_: Partial<ISpec>, context: SpecPipelineContext) => {
    result.series = args.map((pipeline) => {
      return execPipeline<Partial<ISpec>, SpecPipelineContext>(pipeline, context, {})
    }) as ILineSeriesSpec[]

    return result as Partial<ISpec>
  }
}

/**
 * @description 双轴图的透视场景, 不能使用此pipe, 请使用series
 * 因为VTable.PivotVChart会自行解析数据, 而非VChart解析.
 */
export const seriesDualAxis = (...args: VChartSpecPipeline[]): VChartSpecPipe => {
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

  return (_: Partial<ISpec>, context: SpecPipelineContext) => {
    result.series = args.map((pipeline, index) => {
      const seriesContext = createDualContext(context, index)
      return execPipeline<ISpec, SpecPipelineContext>(pipeline, seriesContext, {})
    }) as ILineSeriesSpec[]

    return result
  }
}
