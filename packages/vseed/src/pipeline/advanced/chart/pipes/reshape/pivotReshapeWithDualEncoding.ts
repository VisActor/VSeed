import { dataReshapeByEncoding, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import { measureDepth } from 'src/pipeline/utils'
import type {
  AdvancedPipe,
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
  const { dimensions, measures, encoding, chartType } = advancedVSeed

  if (!measures || !dimensions || !dataset || !encoding) {
    return result
  }

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
    if (measures.length === 0) {
      throw new Error('measures can not be empty')
    }

    if (measures.length > 2) {
      throw new Error('measures can not be more than 2')
    }

    const foldInfoList: FoldInfo[] = []
    const unfoldInfoList: UnfoldInfo[] = []

    const datasets: Dataset[] = []
    const primaryMeasures = measures[0]
    const secondaryMeasures = (measures[1] || [])

    if (primaryMeasures && primaryMeasures.children) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(dataset, dimensions, primaryMeasures.children, encoding as Encoding, {
        foldMeasureValue: `${FoldPrimaryMeasureValue}${index}`,
      })

      datasets.push(newDataset)
      foldInfoList.push(foldInfo)
      unfoldInfoList.push(unfoldInfo)
    }

    if (secondaryMeasures && secondaryMeasures.children) {
      const {
        dataset: newDataset,
        foldInfo,
        unfoldInfo,
      } = dataReshapeByEncoding(dataset, dimensions, secondaryMeasures.children, encoding as Encoding, {
        foldMeasureValue: `${FoldSecondaryMeasureValue}${index}`,
      })

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
