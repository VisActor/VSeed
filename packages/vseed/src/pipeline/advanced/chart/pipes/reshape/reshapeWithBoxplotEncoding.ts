import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, AdvancedVSeed, ColumnParallel, Encoding } from 'src/types'

export const reshapeWithBoxplotEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding } = advancedVSeed

  const colorMeasureId = getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed)
  const {
    dataset: newDatasets,
    foldInfo,
    unfoldInfo,
  } = dataReshapeByEncoding(
    dataset,
    uniqueBy(dimensions, (item) => item.id),
    uniqueBy(findAllMeasures(measures), (item) => item.id),
    encoding as Encoding,
    {
      colorItemAsId: false,
      colorMeasureId,
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
