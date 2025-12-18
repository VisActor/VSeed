import type {
  ChartType,
  Dataset,
  DualAxisMeasure,
  DualAxisOptions,
  SpecPipelineContext,
  VChartSpecPipe,
} from 'src/types'
import { DEFAULT_DUAL_CHART_TYPE, execPipeline } from '../../../../utils'
import type { ICommonChartSpec, ILineSeriesSpec, ISpec } from '@visactor/vchart'
import { FoldPrimaryMeasureValue } from 'src/dataReshape/constant'

export const series = (
  pipeByAxis: ((options: DualAxisOptions) => VChartSpecPipe)[],
  pipes: VChartSpecPipe[],
): VChartSpecPipe => {
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
    const { advancedVSeed } = context
    const { datasetReshapeInfo, reshapeMeasures = [] } = advancedVSeed
    const { foldInfoList = [], index } = datasetReshapeInfo[0]!

    result.series = foldInfoList!.map((foldInfo) => {
      const measureId = Object.keys(foldInfo.foldMap)[0]
      const axisType = foldInfo.measureValue === `${FoldPrimaryMeasureValue}${index}` ? 'primary' : 'secondary'
      const measure = (reshapeMeasures[index] ?? []).find((m) => m.id === measureId)!

      const options: DualAxisOptions = {
        axisType,
        chartType: ((measure as DualAxisMeasure)?.chartType ??
          (axisType === 'primary' ? DEFAULT_DUAL_CHART_TYPE.primary : DEFAULT_DUAL_CHART_TYPE.secondary)) as ChartType,
        foldInfo,
      }
      const pipeline = [...pipeByAxis.map((p) => p(options)), ...pipes]
      return execPipeline<ISpec, SpecPipelineContext>(pipeline, context, {})
    }) as ILineSeriesSpec[]

    return result
  }
}

/**
 * @description 双轴图的透视场景, 不能使用此pipe, 请使用series
 * 因为VTable.PivotVChart会自行解析数据, 而非VChart解析.
 */
export const seriesDualAxis = (
  pipeByAxis: ((options: DualAxisOptions) => VChartSpecPipe)[],
  pipes: VChartSpecPipe[],
): VChartSpecPipe => {
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

  return (_: Partial<ISpec>, context: SpecPipelineContext) => {
    const { advancedVSeed } = context
    const { datasetReshapeInfo, dataset, reshapeMeasures = [] } = advancedVSeed

    result.series = dataset.map((d, index) => {
      const seriesContext = {
        ...context,
        advancedVSeed: {
          ...advancedVSeed,
          dataset: d as Dataset,
        },
      }

      const foldInfo = datasetReshapeInfo[0]!.foldInfoList![index]
      const measureId = Object.keys(foldInfo.foldMap)[0]
      const axisType = foldInfo.measureValue === FoldPrimaryMeasureValue ? 'primary' : 'secondary'
      const measure = (reshapeMeasures[0] ?? []).find((m) => m.id === measureId)!

      const options: DualAxisOptions = {
        axisType,
        chartType: ((measure as DualAxisMeasure)?.chartType ??
          (axisType === 'primary' ? DEFAULT_DUAL_CHART_TYPE.primary : DEFAULT_DUAL_CHART_TYPE.secondary)) as ChartType,
        foldInfo,
      }
      const pipeline = [...pipeByAxis.map((p) => p(options)), ...pipes]
      return execPipeline<ISpec, SpecPipelineContext>(pipeline, seriesContext, {})
    }) as ILineSeriesSpec[]

    return result
  }
}
