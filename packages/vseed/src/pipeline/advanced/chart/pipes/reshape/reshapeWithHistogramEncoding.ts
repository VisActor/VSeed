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
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  Datum,
  Dimension,
  Encoding,
  FoldInfo,
  Measure,
} from 'src/types'
import { bin } from '@visactor/vdataset'
import { uniqueBy } from 'remeda'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes/color/colorAdapter'

export const reshapeWithHistogramEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { encoding = {}, config, measures = [] } = advancedVSeed
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []
  const uniqDims = uniqueBy(dimensions, (item: Dimension) => item.id)
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

  if (encoding.value?.length) {
    const valueField = encoding.value[0]
    const m = measures.find((m: Measure) => m.id === valueField)
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

    res.dataset.forEach((d: Datum) => {
      newDatasets.push(d)
    })
    unfoldInfo = res.unfoldInfo
  } else if (encoding.x0?.length && encoding.x1?.length && encoding.y?.length) {
    const res = dataReshapeByEncoding(
      dataset,
      uniqueBy(dimensions, (item: Dimension) => item.id),
      measures.filter((item: Measure) => encoding.y?.includes(item.id)).slice(0, 1),
      encoding as Encoding,
      {
        colorItemAsId: false,
        colorMeasureId,
        omitIds: [],
      },
    )

    res.dataset.forEach((datum: Datum) => {
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
  }
}
