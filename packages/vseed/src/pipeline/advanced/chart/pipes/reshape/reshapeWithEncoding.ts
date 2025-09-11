import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type { AdvancedPipe, AdvancedVSeed, ColumnParallel, Encoding } from 'src/types'

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

  const {
    dataset: newDatasets,
    foldInfo,
    unfoldInfo,
  } = dataReshapeByEncoding(
    dataset,
    uniqueBy(dimensions, (item) => item.id),
    uniqueBy(measures, (item) => item.id),
    encoding as Encoding,
    {
      colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed),
    },
  )

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: [
      {
        id: String(chartType),
        index: 0,
        foldInfo,
        unfoldInfo,
      },
    ],
    dimensions,
    measures,
  }
}
