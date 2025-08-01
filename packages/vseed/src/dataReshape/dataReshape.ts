import type {
  Dataset,
  Dimension,
  FoldInfo,
  Measure,
  UnfoldInfo,
} from 'src/types'
import { foldMeasures } from './foldMeasures'
import { FoldMeasureId, FoldMeasureName, FoldMeasureValue } from './constant'
import { unfoldDimensions } from './unfoldDimensions'

export const dataReshape = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
): {
  dataset: Dataset
  foldInfo: FoldInfo
  unfoldInfo: UnfoldInfo
} => {
  const originIds = [
    ...dimensions.map((d) => d.id),
    ...measures.map((m) => m.id),
  ]
  // 合并所有指标为1个指标
  const { dataset: foldedDataset, foldInfo } = foldMeasures(
    dataset,
    measures,
    FoldMeasureId,
    FoldMeasureName,
    FoldMeasureValue,
    originIds,
  )

  // 展开指定的维度为指标
  const { dataset: unfoldedDataset, unfoldInfo } = unfoldDimensions(
    foldedDataset,
    [
      ...dimensions,
      { id: FoldMeasureName, alias: '指标名称', location: 'dimension' },
    ],
    [{ id: FoldMeasureValue, alias: '指标值' }],
    1,
  )

  const tempMeasures = unfoldInfo.newMeasureIds.map((d) => ({
    id: d,
    alias: d,
  }))

  // 合并所有指标为1个指标
  const { dataset: finalDataset } = foldMeasures(
    unfoldedDataset,
    tempMeasures,
    FoldMeasureName,
    FoldMeasureId,
    FoldMeasureValue,
    originIds,
  )
  return { dataset: finalDataset, foldInfo, unfoldInfo }
}
