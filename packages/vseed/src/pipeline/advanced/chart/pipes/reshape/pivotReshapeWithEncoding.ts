import { uniqueBy } from 'remeda'
import { dataReshapeByEncoding, FoldMeasureValue } from 'src/dataReshape'
import { getColorMeasureId } from 'src/pipeline/spec/chart/pipes'
import type {
  AdvancedPipe,
  AdvancedVSeed,
  ColumnParallel,
  Dataset,
  DatasetReshapeInfo,
  Dimension,
  Encoding,
  MeasureGroup,
} from 'src/types'

export const pivotReshapeWithEncoding: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed as ColumnParallel
  const { dimensions = [], measures = [], encoding } = advancedVSeed

  const measureGroups: MeasureGroup[] = []
  if (measures) {
    measures.forEach((measure: MeasureGroup) => {
      if (measure.children && measure.children.length > 0) {
        measureGroups.push(measure)
      }
    })
  }
  const hasEncoding = (vseed.dimensions || []).some((item: Dimension) => item.encoding)

  const datasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []

  measureGroups.forEach((measureGroup, index) => {
    const measures = measureGroup.children
    if (!measures) {
      return
    }
    const groupId = measureGroup.id
    const {
      dataset: newSubDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeByEncoding(
      dataset,
      uniqueBy(dimensions, (item) => item.id),
      uniqueBy(measures, (item) => item.id),
      encoding as Encoding,
      {
        colorItemAsId: hasEncoding,
        foldMeasureValue: `${FoldMeasureValue}${groupId}`,
        colorMeasureId: getColorMeasureId(advancedVSeed as AdvancedVSeed),
      },
    )

    const reshapeInfo = {
      id: groupId,
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
