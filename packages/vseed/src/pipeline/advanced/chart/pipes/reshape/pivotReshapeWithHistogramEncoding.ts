import { bin } from '@visactor/vdataset'
import { uniqueBy } from 'remeda'
import {
  BinCountMeasureId,
  BinEndMeasureId,
  BinPercentageMeasureId,
  BinStartMeasureId,
  dataReshapeByEncoding,
  FoldMeasureId,
  FoldMeasureName,
  FoldMeasureValue,
  Separator,
  unfoldDimensions,
} from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Datum,
  Dimension,
  Encoding,
  FoldInfo,
} from 'src/types'

export const pivotReshapeWithHistogramEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { encoding = {}, config } = advancedVSeed
  const reshapeMeasures = advancedVSeed.reshapeMeasures ?? []
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []
  const colorMeasureId = getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed)
  const uniqDims = uniqueBy(dimensions, (item: Dimension) => item.id)
  const chartConfig = config?.[chartType as 'histogram']
  const binCount = chartConfig?.binCount
  const binStep = chartConfig?.binStep
  const binValueType = chartConfig?.binValueType

  const rowColumnFields = uniqueBy(
    dimensions.filter((dim: Dimension) => dim.encoding === 'row' || dim.encoding === 'column'),
    (item: Dimension) => item.id,
  )

  const datasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  reshapeMeasures.forEach((subMeasures, index) => {
    if (!subMeasures) {
      return
    }
    const groupId = subMeasures[0].id ?? DEFAULT_PARENT_ID

    let newDatasets: any[] = []
    let foldInfo: FoldInfo = {
      foldMap: {},
      measureId: FoldMeasureId,
      measureName: FoldMeasureName,
      measureValue: FoldMeasureValue,
      statistics: {
        max: -Infinity,
        min: Infinity,
        sum: 0,
        count: 0,
        colorMin: Infinity,
        colorMax: -Infinity,
      },
    }
    let unfoldInfo: any = {}

    if (encoding.value?.length) {
      const valueField = encoding.value[0]
      const m = subMeasures.find((m) => m.id === valueField)
      const binData = bin(dataset, {
        field: valueField,
        groupField: [...(encoding.x ?? []), ...(encoding.color ?? [])] as string[],
        facetField: rowColumnFields.map((item: Dimension) => item.id),
        bins: binCount,
        step: binStep,
        outputNames: {
          x0: BinStartMeasureId,
          x1: BinEndMeasureId,
          count: BinCountMeasureId,
          percentage: BinPercentageMeasureId,
        },
      }) as Dataset

      binData.forEach((datum: Datum) => {
        datum[FoldMeasureId] = valueField
        datum[FoldMeasureName] = m?.alias ?? valueField
        const valueNumber = binValueType === 'percentage' ? +datum[BinPercentageMeasureId] : +datum[BinCountMeasureId]
        datum[FoldMeasureValue] = valueNumber
        datum[valueField] = valueNumber

        foldInfo.statistics.min = Math.min(foldInfo.statistics.min, valueNumber)
        foldInfo.statistics.max = Math.max(foldInfo.statistics.max, valueNumber)
        foldInfo.statistics.sum += valueNumber
        foldInfo.statistics.count++
      })
      if (m?.id) {
        foldInfo.foldMap[m?.id] = m?.alias
      }

      const res = unfoldDimensions(binData, uniqDims, encoding as Encoding, {
        foldMeasureId: FoldMeasureId,
        separator: Separator,
        colorItemAsId: false,
      })

      res.dataset.forEach((d) => {
        newDatasets.push(d)
      })
      unfoldInfo = res.unfoldInfo
    } else if (encoding.x0?.length && encoding.x1?.length && encoding.y?.length) {
      const res = dataReshapeByEncoding(
        dataset,
        uniqueBy(dimensions, (item: Dimension) => item.id),
        subMeasures.filter((item) => encoding.y?.includes(item.id)).slice(0, 1),
        encoding as Encoding,
        {
          colorItemAsId: false,
          colorMeasureId,
        },
      )

      res.dataset.forEach((datum) => {
        datum[BinStartMeasureId] = datum[encoding.x0![0]]
        datum[BinEndMeasureId] = datum[encoding.x1![0]]
        datum[FoldMeasureId] = datum[encoding.y![0]]
      })

      newDatasets = res.dataset
      foldInfo = res.foldInfo
      unfoldInfo = res.unfoldInfo
    }

    const reshapeInfo = {
      id: `${groupId}`,
      index,
      foldInfo,
      unfoldInfo,
    }
    datasets.push(newDatasets)
    datasetReshapeInfo.push(reshapeInfo)
  })

  return {
    ...result,
    dataset: datasets,
    datasetReshapeInfo: datasetReshapeInfo,
  }
}
