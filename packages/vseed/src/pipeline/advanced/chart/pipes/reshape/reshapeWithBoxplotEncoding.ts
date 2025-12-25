import {
  FoldMeasureId,
  FoldMeasureName,
  LowerWhisker,
  MedianMeasureId,
  OutliersMeasureId,
  Q1MeasureValue,
  Q3MeasureValue,
  Separator,
  unfoldDimensions,
  UpperWhisker,
} from 'src/dataReshape'
import type { AdvancedPipe, ColumnParallel, Dataset, Datum, Dimension, Encoding } from 'src/types'
import { boxplot } from '@visactor/vdataset'
import { uniqueBy } from 'remeda'

export const reshapeWithBoxplotEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { encoding = {}, config, measures = [] } = advancedVSeed
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []
  const uniqDims = uniqueBy(dimensions, (item: Dimension) => item.id)

  const whiskers = config?.[chartType as 'boxPlot']?.whiskers

  let newDatasets: any[] = []
  let foldInfo: any = {}
  let unfoldInfo: any = {}

  if (encoding.value?.length) {
    const boxPlotDataList: Dataset = []
    encoding.value.forEach((f) => {
      const m = measures.find((m) => m.id === f)
      const boxPlotData = boxplot(dataset, {
        field: f,
        groupField: [...(encoding.x ?? []), ...(encoding.color ?? [])] as string[],
        whiskers,
        outputNames: {
          q1: Q1MeasureValue,
          q3: Q3MeasureValue,
          lowerWhisker: LowerWhisker,
          upperWhisker: UpperWhisker,
          median: MedianMeasureId,
          outliers: OutliersMeasureId,
        },
      }) as Dataset

      boxPlotData.forEach((datum: Datum) => {
        datum[FoldMeasureId] = f
        datum[FoldMeasureName] = m?.alias ?? f
      })
      boxPlotDataList.push(...boxPlotData)
    })
    const res = unfoldDimensions(boxPlotDataList, uniqDims, encoding as Encoding, {
      foldMeasureId: FoldMeasureId,
      separator: Separator,
      colorItemAsId: false,
    })

    res.dataset.forEach((d: Datum) => {
      newDatasets.push(d)
    })
    unfoldInfo = res.unfoldInfo
  } else if (
    encoding.q1?.length &&
    encoding.q3?.length &&
    encoding.min?.length &&
    encoding.max?.length &&
    encoding.median?.length
  ) {
    const res = unfoldDimensions(dataset, uniqDims, encoding as Encoding, {
      foldMeasureId: FoldMeasureId,
      separator: Separator,
      colorItemAsId: false,
    })

    res.dataset.forEach((datum: Datum) => {
      datum[UpperWhisker] = datum[encoding.max![0]]
      datum[LowerWhisker] = datum[encoding.min![0]]
      datum[Q1MeasureValue] = datum[encoding.q1![0]]
      datum[Q3MeasureValue] = datum[encoding.q3![0]]
      datum[MedianMeasureId] = datum[encoding.median![0]]
    })

    newDatasets = res.dataset
    foldInfo = {}
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
