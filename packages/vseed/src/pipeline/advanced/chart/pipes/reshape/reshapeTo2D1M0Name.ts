import { dataReshapeFor2D1M0Name } from 'src/dataReshape'
import type { AdvancedPipe } from 'src/types'

/**
 * @description 数据重塑, 将任意维度、任意指标, 重塑为2个维度1个指标, 并且在0维度时, 合并所有指标为一个维度. 兼容折线图、面积图、雷达图只有指标, 没有维度的场景
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const reshapeTo2D1M0Name: AdvancedPipe = (advancedVSeed, context) => {
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

  const { dataset: newDatasets, foldInfo, unfoldInfo } = dataReshapeFor2D1M0Name(dataset, dimensions, measures)

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: [
      {
        id: '2D1M',
        foldInfo,
        unfoldInfo,
      },
    ],
    dimensions,
    measures,
  }
}
