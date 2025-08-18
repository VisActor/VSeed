import { FoldMeasureId, FoldMeasureName, FoldMeasureValue, UnfoldDimensionGroup } from 'src/dataReshape/constant'
import { dataReshapeFor2D1M0Name } from 'src/dataReshape'
import type { AdvancedPipe, Dataset, DatasetReshapeInfo, Dimensions, DimensionGroup } from 'src/types'

/**
 * @description 数据重塑为透视结构, 如果存在指标分组, 则将数据按组划分. 如果存在行列维度, 则生成行列树结构. 并且在0维度时, 合并所有指标为一个维度. 兼容折线图、面积图、雷达图只有指标, 没有维度的场景
 * @param advancedVSeed
 * @param context
 * @returns
 */
export const pivotReshapeTo2D1M0Name: AdvancedPipe = (advancedVSeed, context) => {
  const result = { ...advancedVSeed }
  const { vseed } = context
  const { dataset } = vseed
  const { measures } = advancedVSeed
  const dimensions = advancedVSeed.dimensions as Dimensions

  if (!measures || !dimensions) {
    return result
  }

  const measureGroups: DimensionGroup[] = []
  if (measures) {
    measures.forEach((measure: DimensionGroup) => {
      if (measure.children && measure.children.length > 0) {
        measureGroups.push(measure)
      }
    })
  }
  const commonDimensions = dimensions.filter((dim) => dim.location === 'dimension')

  const newDatasets: Dataset = []
  const datasetReshapeInfo: DatasetReshapeInfo = []
  measureGroups.forEach((measureGroup) => {
    const measures = measureGroup.children
    if (!measures) {
      return
    }
    const groupId = measureGroup.id
    const {
      dataset: newSubDataset,
      foldInfo,
      unfoldInfo,
    } = dataReshapeFor2D1M0Name(dataset, commonDimensions, measures, {
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
