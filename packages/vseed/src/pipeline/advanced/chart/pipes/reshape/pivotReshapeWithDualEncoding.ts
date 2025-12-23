import { uniqueBy, unique } from 'remeda'
import { dataReshapeByEncoding, DimAxisType, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import { DEFAULT_DUAL_CHART_TYPE } from 'src/index'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Datum,
  Dimension,
  DualAxisMeasure,
  Encoding,
  FoldInfo,
  Measure,
  Measures,
  UnfoldInfo,
} from 'src/types'

export const pivotReshapeWithDualEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { encoding, chartType } = advancedVSeed
  const reshapeMeasures = advancedVSeed.reshapeMeasures ?? []
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []
  const allMeasuresIds = reshapeMeasures.flatMap((measureGroup: Measures) => measureGroup.map((m) => m.id))

  const datasetList: Dataset[] = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  reshapeMeasures.forEach((measures: Measures, index: number) => {
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
          foldMeasureValue: `${FoldPrimaryMeasureValue}${index}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
          omitIds: allMeasuresIds,
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
          foldMeasureValue: `${FoldSecondaryMeasureValue}${index}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
          omitIds: allMeasuresIds,
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

    const reshapeInfo = {
      id: `${chartType}-${index}`,
      index,
      foldInfo: foldInfoList[0],
      foldInfoList: foldInfoList,
      unfoldInfo: unfoldInfo,
    }

    datasetReshapeInfo.push(reshapeInfo)
    datasetList.push(datasets.flat(2))
  })

  return {
    ...result,
    dataset: datasetList,
    datasetReshapeInfo: datasetReshapeInfo,
  }
}
