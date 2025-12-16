import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding, FoldMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import { DEFAULT_PARENT_ID } from 'src/pipeline/utils/constant'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Dimension,
  Encoding,
  Measure,
} from 'src/types'

export const pivotReshapeWithEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { encoding } = advancedVSeed
  const reshapeMeasures = advancedVSeed.reshapeMeasures ?? []
  const dimensions = advancedVSeed.reshapeDimensions ?? advancedVSeed.dimensions ?? []

  const allMeasuresIds = reshapeMeasures.flatMap((measureGroup) => measureGroup.map((m) => m.id))

  const datasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  reshapeMeasures.forEach((measures, index) => {
    if (!measures) {
      return
    }
    const groupId = measures[0].parentId ?? DEFAULT_PARENT_ID
    const {
      dataset: newSubDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(
      dataset,
      uniqueBy(dimensions, (item: Dimension) => item.id),
      uniqueBy(measures, (item: Measure) => item.id),
      encoding as Encoding,
      {
        colorItemAsId: false,
        foldMeasureValue: `${FoldMeasureValue}${groupId}`,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed, vseed),
        omitIds: allMeasuresIds,
      },
    )

    const reshapeInfo = {
      id: `${groupId}`,
      index,
      foldInfo,
      unfoldInfo,
    }
    datasets.push(newSubDataset)
    datasetReshapeInfo.push(reshapeInfo)
  })

  return {
    ...result,
    dataset: datasets,
    datasetReshapeInfo: datasetReshapeInfo,
  }
}
