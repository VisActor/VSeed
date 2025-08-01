import type { Dataset, Dimension, FoldInfo, Measure, UnfoldInfo } from 'src/types'
import { foldMeasures } from './foldMeasures'
import { FoldDimensionGroup, FoldMeasureId, FoldMeasureName, FoldMeasureValue } from './constant'
import { unfoldDimensions } from './unfoldDimensions'

const emptyReshapeResult = {
  dataset: [],
  foldInfo: {
    foldMap: {},
    measureId: '',
    measureName: '',
    measureValue: '',
  },
  unfoldInfo: {
    groupName: '',
    colorItems: [],
  },
}
/**
 * 数据重塑为1个维度1个指标
 * @param dataset
 * @param dimensions
 * @param measures
 * @returns
 */
export const dataReshapeFor1D1M = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
): {
  dataset: Dataset
  foldInfo: FoldInfo
  unfoldInfo: UnfoldInfo
} => {
  if (dimensions.length === 0 && measures.length === 0) {
    return emptyReshapeResult
  }

  // 合并所有指标为1个指标
  const { dataset: foldedDataset, foldInfo } = foldMeasures(
    dataset,
    measures,
    FoldMeasureId,
    FoldMeasureName,
    FoldMeasureValue,
  )

  if (dimensions.length === 0) {
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      foldedDataset,
      [{ id: FoldMeasureName, alias: '指标名称', location: 'dimension' }],
      [{ id: FoldMeasureValue, alias: '指标值' }],
      0,
      FoldDimensionGroup,
    )
    return { dataset: finalDataset, foldInfo, unfoldInfo }
  } else {
    // 展开指定的维度为指标
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      foldedDataset,
      [...dimensions, { id: FoldMeasureName, alias: '指标名称', location: 'dimension' }],
      [{ id: FoldMeasureValue, alias: '指标值' }],
      0,
      FoldDimensionGroup,
    )
    return { dataset: finalDataset, foldInfo, unfoldInfo }
  }
}
