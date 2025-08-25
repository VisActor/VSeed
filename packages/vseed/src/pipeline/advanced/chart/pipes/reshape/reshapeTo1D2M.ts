import { dataReshapeFor1D2M } from 'src/dataReshape'
import type { AdvancedPipe } from 'src/types'

/**
 * 数据重塑, 将任意维度、任意指标, 重塑为1个维度2个指标.
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const reshapeTo1D2M: AdvancedPipe = (advancedVSeed, context) => {
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

  const { dataset: newDatasets, foldInfo, unfoldInfo } = dataReshapeFor1D2M(dataset, dimensions, measures)

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: [
      {
        id: '1D2M',
         index: 0,
        foldInfo,
        unfoldInfo,
      },
    ],
  }
}
