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
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, ColumnParallel, Dataset, Dimension, Encoding, FoldInfo } from 'src/types'
import { bin } from '@visactor/vdataset'
import { uniqueBy } from 'remeda'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes/color/colorAdapter'

export const reshapeWithHistogramEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding = {}, config } = advancedVSeed
  const uniqDims = uniqueBy(dimensions, (item) => item.id)
  const chartConfig = config?.[chartType as 'histogram']
  const binCount = chartConfig?.binCount
  const binStep = chartConfig?.binStep
  const binValueType = chartConfig?.binValueType

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

  const colorMeasureId = getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed)
  const allMeasures = findAllMeasures(measures)

  if (encoding.value?.length) {
    const valueField = encoding.value[0]
    const m = allMeasures.find((m) => m.id === valueField)
    const binData = bin(dataset, {
      field: valueField,
      groupField: [...(encoding.x ?? []), ...(encoding.color ?? [])] as string[],
      bins: binCount,
      step: binStep,
      outputNames: {
        x0: BinStartMeasureId,
        x1: BinEndMeasureId,
        count: BinCountMeasureId,
        percentage: BinPercentageMeasureId,
      },
    }) as Dataset

    binData.forEach((datum) => {
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
      findAllMeasures(measures)
        .filter((item) => encoding.y?.includes(item.id))
        .slice(0, 1),
      encoding as Encoding,
      {
        colorItemAsId: false,
        colorMeasureId,
      },
    )

    res.dataset.forEach((datum) => {
      datum[BinStartMeasureId] = datum[encoding.x0![0]]
      datum[BinEndMeasureId] = datum[encoding.x1![0]]
    })

    newDatasets = res.dataset
    foldInfo = res.foldInfo
    unfoldInfo = res.unfoldInfo
  }

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: [
      {
        id: String(chartType),
        index: 0,
        foldInfo,
        unfoldInfo,
      },
    ],
    dimensions,
    measures,
  }
}
