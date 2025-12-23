import { uniqueBy, unique } from 'remeda'
import { dataReshapeByEncoding, DimAxisType, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { DEFAULT_DUAL_CHART_TYPE } from 'src/pipeline/utils/chatType'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  Datum,
  Dimension,
  DualAxisMeasure,
  Encoding,
  FoldInfo,
  Measure,
  UnfoldInfo,
} from 'src/types'

export const reshapeWithDualEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { encoding, chartType } = advancedVSeed
  const measures = (advancedVSeed.reshapeMeasures?.[0] ?? []) as Measure[]
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []

  const foldInfoList: FoldInfo[] = []
  const unfoldInfoList: UnfoldInfo[] = []

  const datasets: Dataset[] = []
  const primaryMeasures = measures.filter((m) => m.encoding === 'primaryYAxis')
  const secondaryMeasures = measures.filter((m) => m.encoding === 'secondaryYAxis')
  const primaryChartTypes: string[] = unique(primaryMeasures.map((m) => (m as DualAxisMeasure).chartType!))
  const secondaryChartTypes: string[] = unique(secondaryMeasures.map((m) => (m as DualAxisMeasure).chartType!))

  if (!primaryChartTypes.length) {
    primaryChartTypes.push(DEFAULT_DUAL_CHART_TYPE.primary)
  }

  if (!secondaryChartTypes.length) {
    secondaryChartTypes.push(DEFAULT_DUAL_CHART_TYPE.secondary)
  }

  primaryChartTypes.forEach((chartType) => {
    const primaryResult = dataReshapeByEncoding(
      dataset,
      uniqueBy(dimensions, (item: Dimension) => item.id),
      uniqueBy(
        primaryMeasures.filter((m) => (m as DualAxisMeasure).chartType! === chartType),
        (item: Measure) => item.id,
      ),
      encoding as Encoding,
      {
        colorItemAsId: false,
        foldMeasureValue: FoldPrimaryMeasureValue,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
      },
    )

    primaryResult.dataset.forEach((row: Datum) => {
      row[DimAxisType] = 'primaryYAxis'
    })

    datasets.push(primaryResult.dataset)
    foldInfoList.push(primaryResult.foldInfo)
    unfoldInfoList.push(primaryResult.unfoldInfo)
  })

  secondaryChartTypes.forEach((chartType) => {
    const secondaryResult = dataReshapeByEncoding(
      dataset,
      uniqueBy(dimensions, (item: Dimension) => item.id),
      uniqueBy(
        secondaryMeasures.filter((m) => (m as DualAxisMeasure).chartType! === chartType),
        (item: Measure) => item.id,
      ),
      encoding as Encoding,
      {
        colorItemAsId: false,
        foldMeasureValue: FoldSecondaryMeasureValue,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
      },
    )

    secondaryResult.dataset.forEach((row: Datum) => {
      row[DimAxisType] = 'secondaryYAxis'
    })

    datasets.push(secondaryResult.dataset)
    foldInfoList.push(secondaryResult.foldInfo)
    unfoldInfoList.push(secondaryResult.unfoldInfo)
  })

  const unfoldInfo: UnfoldInfo = {
    ...unfoldInfoList[0],
    colorItems: unfoldInfoList.flatMap((d) => d.colorItems),
    colorIdMap: unfoldInfoList.reduce((prev, cur) => ({ ...prev, ...cur.colorIdMap }), {}),
  }

  return {
    ...result,
    dataset: datasets,
    datasetReshapeInfo: [
      {
        id: String(chartType),
        index: 0,
        foldInfo: foldInfoList[0],
        foldInfoList: foldInfoList,
        unfoldInfo: unfoldInfo,
      },
    ],
  }
}
