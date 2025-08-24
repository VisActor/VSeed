import { dataReshapeFor2D1M, FoldPrimaryMeasureValue, FoldSecondaryMeasureValue } from 'src/dataReshape'
import type { AdvancedPipe, Dimension, FoldInfo, MeasureGroup, UnfoldInfo } from 'src/types'

/**
 * 数据重塑, 将任意维度、任意指标, 重塑为2个维度2个指标.
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const reshapeTo2D2M: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed
  const { dimensions, measures } = advancedVSeed

  if (!measures || !dimensions || !dataset) {
    return result
  }

  if (measures.length === 0) {
    throw new Error('measures can not be empty')
  }
  if (measures.length > 2) {
    throw new Error('measures can not be more than 2')
  }

  const commonDimensions = dimensions.filter((dim) => (dim as Dimension).location === 'dimension')

  const datasets = []
  const foldInfoList: FoldInfo[] = []
  const unfoldInfoList: UnfoldInfo[] = []

  const primaryMeasures = measures[0] as MeasureGroup
  const secondaryMeasures = (measures[1] || measures[0]) as MeasureGroup

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

  const unfoldInfo: UnfoldInfo = {
    groupName: unfoldInfoList[0].groupName,
    groupId: unfoldInfoList[0].groupId,
    colorItems: unfoldInfoList.flatMap((d) => d.colorItems),
    colorIdMap: unfoldInfoList.reduce((prev, cur) => ({ ...prev, ...cur.colorIdMap }), {}),
  }

  return {
    ...result,
    dataset: datasets,
    datasetReshapeInfo: [
      {
        id: '2D2M',
        foldInfo: foldInfoList[0],
        foldInfoList: foldInfoList,
        unfoldInfo: unfoldInfo,
      },
    ],
  }
}
