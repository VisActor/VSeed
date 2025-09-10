import type { Dataset, Dimension, Encoding, FoldInfo, Measure, UnfoldInfo } from 'src/types'
import { foldMeasures } from './foldMeasures'
import { FoldMeasureId, FoldMeasureName, FoldMeasureValue, Separator } from './constant'
import { unfoldDimensions } from './unfoldDimensions'

export const dataReshapeByEncoding = (
  dataset: Dataset,
  dimensions: Dimension[],
  measures: Measure[],
  encoding: Encoding,
  options?: {
    foldMeasureId?: string
    foldMeasureName?: string
    foldMeasureValue?: string
    colorItemAsId?: boolean
    colorMeasureId?: string
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
    colorItemAsId = false,
    colorMeasureId,
  } = options || {}

  // 合并所有指标为1个指标
  const { dataset: foldedDataset, foldInfo } = foldMeasures(dataset, measures, encoding, {
    measureId: foldMeasureId,
    measureName: foldMeasureName,
    measureValue: foldMeasureValue,
    colorMeasureId,
  })

  // 展开指定的维度为指标
  const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(foldedDataset, dimensions, encoding, {
    foldMeasureId,
    separator: Separator,
    colorItemAsId,
  })
  return { dataset: finalDataset, foldInfo, unfoldInfo }
}
