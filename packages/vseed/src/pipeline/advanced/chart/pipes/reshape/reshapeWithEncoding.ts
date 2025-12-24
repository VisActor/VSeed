import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type { AdvancedPipe, AdvancedVSeed, ColumnParallel, Dimension, Encoding, Measure } from 'src/types'

export const reshapeWithEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as ColumnParallel
  const { encoding, reshapeMeasures = [] } = advancedVSeed
  const allMeasuresIds = (reshapeMeasures[0] ?? []).map((m: Measure) => m.id)

  const colorMeasureId = getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed)
  const {
    dataset: newDatasets,
    foldInfo,
    unfoldInfo,
  } = dataReshapeByEncoding(
    dataset,
    uniqueBy(advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? [], (item: Dimension) => item.id),
    uniqueBy(advancedVSeed.reshapeMeasures?.[0] ?? [], (item: Measure) => item.id),
    encoding as Encoding,
    {
      colorItemAsId: false,
      colorMeasureId,
      omitIds: allMeasuresIds,
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
  }
}
