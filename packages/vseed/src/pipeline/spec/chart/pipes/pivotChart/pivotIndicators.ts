import type { PivotChartConstructorOptions } from '@visactor/vtable'
import { execPipeline } from '../../../../utils'
import type { Dataset, Encoding, MeasureGroup, SpecPipe, SpecPipeline, SpecPipelineContext } from 'src/types'
import { unique } from 'remeda'

export const pivotIndicators =
  (chartPipeline: SpecPipeline): SpecPipe =>
  (spec, context): Partial<PivotChartConstructorOptions> => {
    const result = { ...spec } as PivotChartConstructorOptions
    const { advancedVSeed } = context
    const { measures, datasetReshapeInfo, dataset, encoding } = advancedVSeed

    const colorItems = unique(datasetReshapeInfo.flatMap((d) => d.unfoldInfo.colorItems))
    const allMeasureIds = unique(datasetReshapeInfo.flatMap((d) => Object.keys(d.foldInfo.foldMap)))

    const indicators = datasetReshapeInfo.map((reshapeInfo, index) => {
      const measureGroup = measures?.find((d) => d.id === reshapeInfo.id) as MeasureGroup
      const subMeasuresId = (measureGroup?.children || []).map((d) => d.id)
      const invalideMeasuresIds = allMeasureIds.filter((id) => !subMeasuresId.includes(id))

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
        indicatorKey: reshapeInfo.id,
        title: measureGroup?.alias,
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
