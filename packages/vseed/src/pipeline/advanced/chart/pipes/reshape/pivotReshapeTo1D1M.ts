import { FoldMeasureId, FoldMeasureName, FoldMeasureValue, UnfoldDimensionGroup } from 'src/dataReshape/constant'
import { dataReshapeFor1D1M } from 'src/dataReshape'
import type { AdvancedPipe, Dataset, DatasetReshapeInfo, Dimensions, MeasureGroup } from 'src/types'

/**
 * 数据重塑为透视结构, 如果存在指标分组, 则将数据按组划分. 如果存在行列维度, 则生成行列树结构.
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const pivotReshapeTo1D1M: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed
  const { measures } = advancedVSeed
  const dimensions = advancedVSeed.dimensions as Dimensions

  if (!measures || !dimensions) {
    return result
  }

  const measureGroups: MeasureGroup[] = []
  if (measures) {
    measures.forEach((measure: MeasureGroup) => {
      if (measure.children && measure.children.length > 0) {
        measureGroups.push(measure)
      }
    })
  }
  const newDatasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []
  measureGroups.forEach((measureGroup) => {
    const measures = measureGroup.children
    if (!measures) {
      return
    }

    const commonDimensions = dimensions.filter((dim) => dim.location === 'dimension')
    const groupId = measureGroup.id
    const {
      dataset: newSubDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeFor1D1M(dataset, commonDimensions, measures, {
      foldMeasureId: FoldMeasureId,
      foldMeasureName: FoldMeasureName,
      foldMeasureValue: FoldMeasureValue + groupId,
      unfoldDimensionGroup: UnfoldDimensionGroup,
    })
    const reshapeInfo = {
      id: groupId,
      foldInfo,
      unfoldInfo,
    }
    newDatasets.push(newSubDataset)
    datasetReshapeInfo.push(reshapeInfo)
  })

  return {
    ...result,
    dataset: newDatasets,
    datasetReshapeInfo: datasetReshapeInfo,
  }
}
