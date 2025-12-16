import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Dimension,
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
  const allMeasuresIds = reshapeMeasures.flatMap((measureGroup) => measureGroup.map((m) => m.id))

  const datasetList: Dataset[] = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  reshapeMeasures.forEach((measures: Measures, index) => {
    const foldInfoList: FoldInfo[] = []
    const unfoldInfoList: UnfoldInfo[] = []

    const datasets: Dataset[] = []
    const primaryMeasures = measures.filter((m) => m.encoding === 'primaryYAxis')
    const secondaryMeasures = measures.filter((m) => m.encoding === 'secondaryYAxis')

    if (primaryMeasures.length) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(
        dataset,
        uniqueBy(dimensions, (item: Dimension) => item.id),
        uniqueBy(primaryMeasures, (item: Measure) => item.id),
        encoding as Encoding,
        {
          colorItemAsId: false,
          foldMeasureValue: `${FoldPrimaryMeasureValue}${index}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
          omitIds: allMeasuresIds,
        },
      )

      datasets.push(newDataset)
      foldInfoList.push(foldInfo)
      unfoldInfoList.push(unfoldInfo)
    }

    if (secondaryMeasures.length) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(
        dataset,
        uniqueBy(dimensions, (item: Dimension) => item.id),
        uniqueBy(secondaryMeasures, (item: Measure) => item.id),
        encoding as Encoding,
        {
          colorItemAsId: false,
          foldMeasureValue: `${FoldSecondaryMeasureValue}${index}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
          omitIds: allMeasuresIds,
        },
      )

      datasets.push(newDataset)
      foldInfoList.push(foldInfo)
      unfoldInfoList.push(unfoldInfo)
    }

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
