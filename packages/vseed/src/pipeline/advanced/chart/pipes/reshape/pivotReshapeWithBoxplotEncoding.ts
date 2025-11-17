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
import type {
  AdvancedPipe,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Dimension,
  Encoding,
  MeasureGroup,
} from 'src/types'

export const pivotReshapeWithBoxplotEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding = {}, config } = advancedVSeed
  const uniqDims = uniqueBy(dimensions, (item: Dimension) => item.id)
  const chartConfig = config?.[chartType as 'boxPlot']
  const whiskers = chartConfig?.whiskers

  const measureGroups: MeasureGroup[] = []
  if (measures) {
    measures.forEach((measure: MeasureGroup) => {
      if (measure.children && measure.children.length > 0) {
        measureGroups.push(measure)
      }
    })
  }

  const rowColumnFields = uniqueBy(
    dimensions.filter((dim: Dimension) => dim.encoding === 'row' || dim.encoding === 'column'),
    (item: Dimension) => item.id,
  )
  const datasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  measureGroups.forEach((measureGroup, index) => {
    const subMeasures = measureGroup.children
    if (!subMeasures) {
      return
    }
    const groupId = measureGroup.id
    let newDatasets: any[] = []
    let foldInfo: any = {}
    let unfoldInfo: any = {}

    if (encoding.value?.length) {
      encoding.value.forEach((f) => {
        const m = subMeasures.find((m) => m.id === f)
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

        boxPlotData.forEach((datum) => {
          datum[FoldMeasureId] = f
          datum[FoldMeasureName] = m?.alias ?? f
        })

        const res = unfoldDimensions(boxPlotData, uniqDims, encoding as Encoding, {
          foldMeasureId: FoldMeasureId,
          separator: Separator,
          colorItemAsId: false,
        })

        res.dataset.forEach((d) => {
          newDatasets.push(d)
        })
        unfoldInfo = res.unfoldInfo
      })
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

      res.dataset.forEach((datum) => {
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

    const reshapeInfo = {
      id: groupId,
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
