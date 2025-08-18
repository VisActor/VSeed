import type { Dataset, Dimension, FoldInfo, Measure, UnfoldInfo } from 'src/types'
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
 * 仅数据重塑为1个维度，不处理指标
 * @param dataset
 * @param dimensions
 * @param measures
 * @returns
 */
export const dataReshapeFor1D = (
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

  if (dimensions.length === 0) {
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      dataset,
      [],
      [],
      0,
      unfoldDimensionGroup,
      unfoldDimensionGroupId,
      foldMeasureId,
    )
    return {
      dataset: finalDataset,
      foldInfo: {
        foldMap: {},
        measureId: foldMeasureId,
        measureName: foldMeasureName,
        measureValue: foldMeasureValue,
      },
      unfoldInfo,
    }
  } else {
    // 展开指定的维度为指标
    const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(
      dataset,
      [...dimensions],
      [{ id: foldMeasureValue, alias: i18n`指标值` }],
      0,
      unfoldDimensionGroup,
      unfoldDimensionGroupId,
      foldMeasureId,
    )
    return {
      dataset: finalDataset,
      foldInfo: {
        foldMap: {},
        measureId: foldMeasureId,
        measureName: foldMeasureName,
        measureValue: foldMeasureValue,
      },
      unfoldInfo,
    }
  }
}
