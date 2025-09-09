import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import type { AdvancedPipe, Encoding, Scatter } from 'src/types'

export const encodingForScatter: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Scatter
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    const detail = encoding.detail || []
    const color = encoding.color || [(dimensions[1] || dimensions[0]).id]

    const mergedDetail = detail.length === 0 ? unique([...color, ...detail]) : detail
    return {
      ...advancedVSeed,
      encoding: {
        ...encoding,
        color,
        detail: mergedDetail,
      },
    }
  }

  const dimensionsWithoutMeasureName = dimensions.filter((item) => item.id !== MeasureName)

  const mergedEncoding: Encoding = {
    color: dimensions.slice(0).map((item) => item.id), // 第二个之后的维度用于颜色
    detail: dimensionsWithoutMeasureName.slice(0).map((item) => item.id), // 第二个之后的维度进行细分
    tooltip: dimensionsWithoutMeasureName.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }
  return { ...advancedVSeed, encoding: mergedEncoding }
}
