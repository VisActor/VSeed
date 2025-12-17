import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { execPipeline, isRectungularCoordinate } from '../../../../utils'
import type { Dataset, Encoding, Measures, PivotChartSpecPipe, SpecPipelineContext, VChartSpecPipe } from 'src/types'
import { unique } from 'remeda'

export const pivotIndicators =
  (chartPipeline: VChartSpecPipe[]): PivotChartSpecPipe =>
  (spec, context): Partial<PivotChartConstructorOptions> => {
    const result = { ...spec } as PivotChartConstructorOptions
    const { advancedVSeed } = context
    const { datasetReshapeInfo, dataset, encoding, reshapeMeasures = [] } = advancedVSeed

    const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))
    const allMeasureIds = unique(datasetReshapeInfo.flatMap((d) => Object.keys(d.foldInfo.foldMap || {})))

    const indicators = datasetReshapeInfo.map((reshapeInfo, index) => {
      const subMeasures = (reshapeMeasures[index] || []) as Measures
      const subMeasuresId = (reshapeMeasures[index] || []).map((d) => d.id)
      const invalideMeasuresIds = allMeasureIds.filter((id: string) => !subMeasuresId.includes(id))

      const newDataset = dataset[index] as Dataset
      const newDatasetReshapeInfo = [
        {
          ...reshapeInfo,
          unfoldInfo: { ...reshapeInfo.unfoldInfo, colorItems },
        },
      ]
      const newContext: SpecPipelineContext = {
        ...context,
        advancedVSeed: {
          ...advancedVSeed,
          pivotAllDatasetReshapeInfo: datasetReshapeInfo,
          datasetReshapeInfo: newDatasetReshapeInfo,
          encoding: Object.keys(encoding).reduce((res, key) => {
            res[key as keyof Encoding] = encoding[key as keyof Encoding]?.filter((e) => {
              return !invalideMeasuresIds.includes(e)
            }) as string[]

            return res
          }, {} as Encoding),
          dataset: newDataset,
        },
      }

      const chartSpec = execPipeline(chartPipeline, newContext, {})
      return {
        indicatorKey: `${reshapeInfo.id}`,
        title: isRectungularCoordinate(advancedVSeed.chartType)
          ? ''
          : subMeasures.map((m) => m.alias ?? m.id).join('-'),
        cellType: 'chart',
        chartModule: 'vchart',
        chartSpec: chartSpec,
        style: {
          padding: [1, 1, 0, 1],
        },
      }
    })

    return {
      ...result,
      indicators: indicators,
    } as Partial<PivotChartConstructorOptions>
  }

export const pivotIndicatorsAsRow: PivotChartSpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    indicatorsAsCol: false,
  }
}

export const pivotIndicatorsAsCol: PivotChartSpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    indicatorsAsCol: true,
  }
}
