import { FoldMeasureId, FoldMeasureName, foldMeasures, FoldMeasureValue } from 'src/dataReshape'
import {} from 'src/pipeline/spec/chart/pipes'
import { findAllMeasures } from 'src/pipeline/utils'
import type { AdvancedPipe, DatasetReshapeInfo, PivotTable } from 'src/types'

export const reshapePivotTable: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset, chartType } = vseed as PivotTable
  const { dimensions, measures } = advancedVSeed
  const { dataset: newDatasets, foldInfo } = foldMeasures(dataset, findAllMeasures(measures), {
    measureId: FoldMeasureId,
    measureName: FoldMeasureName,
    measureValue: FoldMeasureValue,
    allowEmptyFold: false,
  })

  const datasetReshapeInfo = [
    {
      id: String(chartType),
      index: 0,
      foldInfo,
    },
  ] as unknown as DatasetReshapeInfo

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: datasetReshapeInfo,
    dimensions,
    measures,
  }
}
