import { dataReshapeByEncoding } from 'src/dataReshape'
import type { AdvancedPipe, ColumnParallel, Encoding } from 'src/types'

export const reshapeWithEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { dimensions, measures, encoding } = advancedVSeed

  if (!measures || !dimensions || !dataset || !encoding) {
    return result
  }

  if (measures.length === 0) {
    throw new Error('measures can not be empty')
  }

  const { dataset: newDatasets, foldInfo, unfoldInfo } = dataReshapeByEncoding(dataset, dimensions, measures, encoding as Encoding)

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: [
      {
        id: chartType,
        index: 0,
        foldInfo,
        unfoldInfo,
      },
    ],
    dimensions,
    measures,
  }
}
