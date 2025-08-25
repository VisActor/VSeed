import { dataReshapeFor2D1M } from 'src/dataReshape'
import type { AdvancedPipe } from 'src/types'

/**
 * 数据重塑, 将任意维度、任意指标, 重塑为2个维度1个指标.
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const reshapeTo2D1M: AdvancedPipe = (advancedVSeed, context) => {
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

  const { dataset: newDatasets, foldInfo, unfoldInfo } = dataReshapeFor2D1M(dataset, dimensions, measures)

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: [
      {
        id: '2D1M',
        index: 0,
        foldInfo,
        unfoldInfo,
      },
    ],
    dimensions,
    measures,
  }
}
