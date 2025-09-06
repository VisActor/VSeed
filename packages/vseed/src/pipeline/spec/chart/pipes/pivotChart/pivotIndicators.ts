import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { execPipeline } from '../../../../utils'
import type { Dataset, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { unique } from 'remeda'

export const pivotIndicators =
  (chartPipeline: SpecPipeline): SpecPipe =>
  (spec, context) => {
    const result = { ...spec } as PivotChartConstructorOptions
    const { advancedVSeed } = context
    const { measures, datasetReshapeInfo, dataset } = advancedVSeed

    const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))

    const indicators = datasetReshapeInfo.map((reshapeInfo, index) => {
      const measure = measures?.find((d) => d.id === reshapeInfo.id)
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
          datasetReshapeInfo: newDatasetReshapeInfo,
          dataset: newDataset,
        },
      }

      const chartSpec = execPipeline(chartPipeline, newContext, {})
      return {
        indicatorKey: reshapeInfo.id,
        title: measure?.alias,
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
    } as PivotChartConstructorOptions
  }

export const pivotIndicatorsAsRow: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    indicatorsAsCol: false,
  }
}

export const pivotIndicatorsAsCol: SpecPipe = (spec) => {
  const result = { ...spec } as PivotChartConstructorOptions

  return {
    ...result,
    indicatorsAsCol: true,
  }
}
