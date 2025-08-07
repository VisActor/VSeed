import type { Dataset, Dimension, FoldInfo, Measure, UnfoldInfo } from 'src/types'
import { foldMeasures } from './foldMeasures'
import { UnfoldDimensionGroup, FoldMeasureId, FoldMeasureName, FoldMeasureValue } from './constant'
import { unfoldDimensions } from './unfoldDimensions'

const emptyReshapeResult: {
  dataset: Dataset
  foldInfo: FoldInfo
  unfoldInfo: UnfoldInfo
} = {
  dataset: [],
  foldInfo: {
    foldMap: {},
    measureId: '',
    measureName: '',
    measureValue: '',
  },
  unfoldInfo: {
    colorItems: [],
    groupName: '',
  },
}
/**
 * 数据重塑为2个维度1个指标
 * @param dataset
 * @param dimensions
 * @param measures
 * @returns
 */
export const dataReshapeFor2D1M = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  options?: {
    foldMeasureId?: string
    foldMeasureName?: string
    foldMeasureValue?: string
    unfoldDimensionGroup?: string
  },
): {
  dataset: Dataset
  foldInfo: FoldInfo
  unfoldInfo: UnfoldInfo
} => {
  const {
    foldMeasureId = FoldMeasureId,
    foldMeasureName = FoldMeasureName,
    foldMeasureValue = FoldMeasureValue,
    unfoldDimensionGroup = UnfoldDimensionGroup,
  } = options || {}
  if (dimensions.length === 0 && measures.length === 0) {
    return emptyReshapeResult
  }

  // 合并所有指标为1个指标
  const { dataset: foldedDataset, foldInfo } = foldMeasures(
    dataset,
    measures,
    foldMeasureId,
    foldMeasureName,
    foldMeasureValue,
  )

  if (dimensions.length === 0) {
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      foldedDataset,
      [
        { id: foldMeasureId, alias: '指标Id', location: 'dimension' },
        { id: foldMeasureName, alias: '指标名称', location: 'dimension' },
      ],
      [{ id: foldMeasureValue, alias: '指标值' }],
      1,
      unfoldDimensionGroup,
    )
    return { dataset: finalDataset, foldInfo, unfoldInfo }
  } else {
    // 展开指定的维度为指标
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      foldedDataset,
      [...dimensions, { id: foldMeasureName, alias: '指标名称', location: 'dimension' }],
      [{ id: foldMeasureValue, alias: '指标值' }],
      1,
      unfoldDimensionGroup,
    )
    return { dataset: finalDataset, foldInfo, unfoldInfo }
  }
}
