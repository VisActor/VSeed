import type { Dataset, Datum, Dimension, Encoding, FoldInfo, Measure, UnfoldInfo } from 'src/types'
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
  })
  return { dataset: finalDataset, foldInfo, unfoldInfo }
}

const unfoldDimensions = (
  dataset: Dataset,
  dimensions: Dimension[],
  encoding: Encoding,
  options: {
    foldMeasureId: string
    separator: string
  },
): {
  dataset: Dataset
  unfoldInfo: UnfoldInfo
} => {
  const { foldMeasureId, separator } = options

  const unfoldInfo: UnfoldInfo = {
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
  }

  // 每个通道对应的维度
  const { color, x, y, detail, angle } = encoding
  const angleDimensions = angle ? dimensions.filter((dim) => angle.includes(dim.id)) : []
  const xDimensions = x ? dimensions.filter((dim) => x.includes(dim.id)) : []
  const yDimensions = y ? dimensions.filter((dim) => y.includes(dim.id)) : []
  const colorDimensions = color ? dimensions.filter((dim) => color.includes(dim.id)) : []
  const detailDimensions = detail ? dimensions.filter((dim) => detail.includes(dim.id)) : []

  // 离散图例项
  const colorItems = new Set<string>()
  const colorIdMap: Record<string, string> = {}

  // 遍历数据集, 按通道合并维度
  for (let i = 0; i < dataset.length; i++) {
    // 应用编码至Datum上
    const datum = dataset[i]

    /**
     * !important 这是全仓库, 最最最重要的五行代码, 贯穿VSeed整个生命周期, 是化繁为简的绝对核心
     * 1. 点睛之笔: 呼应foldMeasures, 此时此刻的datum一定是单点数据, 维度合并不可能造成任何冲突.
     * 2. 数据即通道
     * 3. 利用需要合并的维度, 直接进行join, 即可生成新的维度, 与指标彻底解耦;
     * 4. 以下通道均在一次遍历中完成, 不存在性能问题
     * 5. 以下通道均可放入多个维度
     */
    applyEncoding(AngleEncoding, angleDimensions, datum, separator)
    applyEncoding(XEncoding, xDimensions, datum, separator)
    applyEncoding(YEncoding, yDimensions, datum, separator)
    applyEncoding(ColorEncoding, colorDimensions, datum, separator)
    applyEncoding(DetailEncoding, detailDimensions, datum, separator)

    // 处理离散的颜色图例
    if (!datum[ColorEncoding]) {
      // 无颜色通道, 则跳过
      continue
    }
    const measureId = String(datum[foldMeasureId])
    const colorItem = String(datum[ColorEncoding])
    const colorId = measureId ? [colorItem, measureId].join(separator) : colorItem
    datum[ColorIdEncoding] = colorId
    colorIdMap[colorId] = colorItem
    colorItems.add(colorId)
  }

  unfoldInfo.colorItems = Array.from(colorItems)
  unfoldInfo.colorIdMap = colorIdMap

  return {
    dataset,
    unfoldInfo,
  }
}

/**
 * @description 应用编码至数据中, 此方法会原地修改数据
 * @param encoding 编码
 * @param dimensions 维度
 * @param datum 数据
 * @param separator 分隔符
 * @returns undefined
 */
const applyEncoding = (encoding: string, dimensions: Dimension[], datum: Datum, separator: string) => {
  if (encoding && dimensions.length) {
    datum[encoding] = dimensions.map((dim) => String(datum[dim.id])).join(separator)
  }
}
