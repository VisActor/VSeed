import type { Dataset, Dimension, FoldInfo, Measure, UnfoldInfo } from 'src/types'
import { foldMeasures } from './foldMeasures'
import {
  UnfoldDimensionGroup,
  FoldMeasureId,
  FoldMeasureName,
  FoldMeasureValue,
  UnfoldDimensionGroupId,
} from './constant'
import { unfoldDimensions } from './unfoldDimensions'
import { i18n } from '../i18n'

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
    groupId: '',
    colorItems: [],
    colorIdMap: {},
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
  options?: {
    foldMeasureId?: string
    foldMeasureName?: string
    foldMeasureValue?: string
    unfoldDimensionGroup?: string
    unfoldDimensionGroupId?: string
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
    unfoldDimensionGroupId = UnfoldDimensionGroupId,
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
      [{ id: foldMeasureName, alias: i18n`指标名称`, location: 'dimension' }],
      [{ id: foldMeasureValue, alias: i18n`指标值` }],
      0,
      unfoldDimensionGroup,
      unfoldDimensionGroupId,
      foldMeasureId,
    )
    return { dataset: finalDataset, foldInfo, unfoldInfo }
  } else {
    // 展开指定的维度为指标
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      foldedDataset,
      [...dimensions, { id: foldMeasureName, alias: i18n`指标名称`, location: 'dimension' }],
      [{ id: foldMeasureValue, alias: i18n`指标值` }],
      0,
      unfoldDimensionGroup,
      unfoldDimensionGroupId,
      foldMeasureId,
    )
    return { dataset: finalDataset, foldInfo, unfoldInfo }
  }
}
