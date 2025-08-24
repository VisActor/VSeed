import { dataReshapeFor2D1M, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import type {
  AdvancedPipe,
  Dataset,
  DatasetReshapeInfo,
  Dimension,
  FoldInfo,
  MeasureGroup,
  UnfoldInfo,
} from 'src/types'

/**
 * 数据重塑, 将任意维度、任意指标, 重塑为2个维度2个指标.
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const pivotReshapeTo2D2M: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed
  const { dimensions, measures } = advancedVSeed

  if (!measures || !dimensions || !dataset) {
    return result
  }

  const commonDimensions = dimensions.filter((dim) => (dim as Dimension).location === 'dimension')

  const datasetList: Dataset[] = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  measures.forEach((measureGroup: MeasureGroup) => {
    const measures = measureGroup.children || []
    if (measures.length === 0) {
      throw new Error('measures can not be empty')
    }
    if (measures.length > 2) {
      throw new Error('measures can not be more than 2')
    }

    const datasets = []
    const foldInfoList: FoldInfo[] = []
    const unfoldInfoList: UnfoldInfo[] = []

    const primaryMeasures = measures[0] as MeasureGroup
    const secondaryMeasures = measures[1] as MeasureGroup

    if (primaryMeasures && primaryMeasures.children) {
      const {
        dataset: newDatasets,
        foldInfo,
        unfoldInfo,
      } = dataReshapeFor2D1M(dataset, commonDimensions, primaryMeasures.children, {
        foldMeasureValue: FoldPrimaryMeasureValue,
      })
      datasets.push(newDatasets)
      foldInfoList.push(foldInfo)
      unfoldInfoList.push(unfoldInfo)
    }

    if (secondaryMeasures && secondaryMeasures.children) {
      const {
        dataset: newDatasets,
        foldInfo,
        unfoldInfo,
      } = dataReshapeFor2D1M(dataset, commonDimensions, secondaryMeasures.children, {
        foldMeasureValue: FoldSecondaryMeasureValue,
      })
      datasets.push(newDatasets)
      foldInfoList.push(foldInfo)
      unfoldInfoList.push(unfoldInfo)
    }

    datasetList.push(datasets)
    datasetReshapeInfo.push({
      id: '2D2M',
      foldInfo: foldInfoList[0],
      unfoldInfo: unfoldInfoList[0],
      foldInfoList: foldInfoList,
      unfoldInfoList: unfoldInfoList,
    })
  })
  return {
    ...result,
    dataset: datasetList,
    datasetReshapeInfo,
  }
}
