import type { Dataset, Dimension, Encoding, FoldInfo, Measure, UnfoldInfo } from 'src/types'
import { foldMeasures } from './foldMeasures'
import {
  FoldMeasureId,
  FoldMeasureName,
  FoldMeasureValue,
  Separator,
  AngleEncoding,
  XEncoding,
  YEncoding,
  ColorEncoding,
  DetailEncoding,
  ColorIdEncoding,
} from './constant'
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
    groupName: '',
    groupId: '',
    encodingAngle: AngleEncoding,
    encodingX: XEncoding,
    encodingY: YEncoding,
    encodingDetail: DetailEncoding,
    encodingColor: ColorEncoding,
    encodingColorId: ColorIdEncoding,
    colorItems: [],
    colorIdMap: {},
  },
}

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

  // 展开指定的维度为指标
  const { dataset: finalDataset, unfoldInfo } = unfoldDimensions(foldedDataset, dimensions, encoding, {
    foldMeasureId,
    separator: Separator,
    colorItemAsId,
  })
  return { dataset: finalDataset, foldInfo, unfoldInfo }
}
