import { boxplot } from '@visactor/vdataset'
import { uniqueBy } from 'remeda'
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
import { DEFAULT_PARENT_ID, revisedBoxPlotFieldKey } from 'src/pipeline/utils'
import type {
  AdvancedPipe,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Datum,
  Dimension,
  Encoding,
  Measure,
} from 'src/types'

export const pivotReshapeWithBoxplotEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { encoding = {}, config } = advancedVSeed
  const reshapeMeasures = advancedVSeed.reshapeMeasures ?? []
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []
  const uniqDims = uniqueBy(dimensions, (item: Dimension) => item.id)
  const chartConfig = config?.[chartType as 'boxPlot']
  const whiskers = chartConfig?.whiskers

  const rowColumnFields = uniqueBy(
    dimensions.filter((dim: Dimension) => dim.encoding === 'row' || dim.encoding === 'column'),
    (item: Dimension) => item.id,
  )
  const datasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  reshapeMeasures.forEach((measureGroup: Measure[], index: number) => {
    const groupId = measureGroup[0].parentId ?? DEFAULT_PARENT_ID
    let newDatasets: any[] = []
    let foldInfo: any = {}
    let unfoldInfo: any = {}
    const validEncodingIds = (encoding.value || []).filter((id: string) =>
      measureGroup.find((field) => field.id === id),
    )

    if (validEncodingIds.length) {
      const boxPlotDataList: Dataset = []
      validEncodingIds.forEach((f: string) => {
        const m = measureGroup.find((m) => m.id === f)
        const boxPlotData = boxplot(dataset, {
          field: f,
          groupField: [
            ...(encoding.x ?? []),
            ...(encoding.color ?? []),
            ...rowColumnFields.map((item: Dimension) => item.id),
          ] as string[],
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
          datum[revisedBoxPlotFieldKey(Q1MeasureValue, groupId)] = datum[Q1MeasureValue]
          datum[revisedBoxPlotFieldKey(Q3MeasureValue, groupId)] = datum[Q3MeasureValue]
          datum[revisedBoxPlotFieldKey(LowerWhisker, groupId)] = datum[LowerWhisker]
          datum[revisedBoxPlotFieldKey(UpperWhisker, groupId)] = datum[UpperWhisker]
          datum[revisedBoxPlotFieldKey(MedianMeasureId, groupId)] = datum[MedianMeasureId]
          datum[revisedBoxPlotFieldKey(OutliersMeasureId, groupId)] = datum[OutliersMeasureId]
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
        datum[revisedBoxPlotFieldKey(Q1MeasureValue, groupId)] = datum[encoding.max![0]]
        datum[LowerWhisker] = datum[encoding.min![0]]
        datum[revisedBoxPlotFieldKey(LowerWhisker, groupId)] = datum[encoding.min![0]]
        datum[Q1MeasureValue] = datum[encoding.q1![0]]
        datum[revisedBoxPlotFieldKey(Q1MeasureValue, groupId)] = datum[encoding.q1![0]]
        datum[Q3MeasureValue] = datum[encoding.q3![0]]
        datum[revisedBoxPlotFieldKey(Q3MeasureValue, groupId)] = datum[encoding.q3![0]]
        datum[MedianMeasureId] = datum[encoding.median![0]]
        datum[revisedBoxPlotFieldKey(MedianMeasureId, groupId)] = datum[encoding.median![0]]
      })

      newDatasets = res.dataset
      foldInfo = {}
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
