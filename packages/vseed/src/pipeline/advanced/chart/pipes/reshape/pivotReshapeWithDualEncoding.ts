import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { measureDepth } from 'src/pipeline/utils'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Encoding,
  FoldInfo,
  MeasureGroup,
  UnfoldInfo,
} from 'src/types'

export const pivotReshapeWithDualEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding, chartType } = advancedVSeed

  const datasetList: Dataset[] = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  const measureGroups: Array<MeasureGroup[]> = []

  const depth = measureDepth(measures)
  if (depth === 3) {
    measures.forEach((measure: MeasureGroup) => {
      measureGroups.push(measure.children as unknown as MeasureGroup[])
    })
  } else if (depth === 2) {
    measureGroups.push(measures as unknown as MeasureGroup[])
  }

  measureGroups.forEach((measures: MeasureGroup[], index) => {
    if (measures.length > 2) {
      throw new Error('measures can not be more than 2 groups in dualAxis')
    }

    const foldInfoList: FoldInfo[] = []
    const unfoldInfoList: UnfoldInfo[] = []

    const datasets: Dataset[] = []
    const primaryMeasures = measures[0]
    const secondaryMeasures = measures[1] || []

    if (primaryMeasures && primaryMeasures.children) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(
        dataset,
        uniqueBy(dimensions, (item) => item.id),
        uniqueBy(primaryMeasures.children, (item) => item.id),
        encoding as Encoding,
        {
          colorItemAsId: false,
          foldMeasureValue: `${FoldPrimaryMeasureValue}${index}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
        },
      )

      datasets.push(newDataset)
      foldInfoList.push(foldInfo)
      unfoldInfoList.push(unfoldInfo)
    }

    if (secondaryMeasures && secondaryMeasures.children) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(
        dataset,
        uniqueBy(dimensions, (item) => item.id),
        uniqueBy(secondaryMeasures.children, (item) => item.id),
        encoding as Encoding,
        {
          colorItemAsId: false,
          foldMeasureValue: `${FoldSecondaryMeasureValue}${index}`,
          colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
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
