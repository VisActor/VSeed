import { unique } from 'remeda'
import type { AdvancedPipe, Encoding, Radar } from 'src/types'

export const encodingForRadar: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Radar
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    const angle = encoding.angle || [dimensions[0].id]
    const color = encoding.color || [(dimensions[1] || dimensions[0]).id]
    const detail = encoding.detail || []

    const mergedDetail = unique([...angle, ...color, ...detail])
    return {
      ...advancedVSeed,
      encoding: {
        ...encoding,
        angle,
        color,
        detail: mergedDetail,
      },
    }
  }

  const mergedEncoding: Encoding = {
    angle: dimensions.slice(0, 1).map((item) => item.id), // 第一个维度放置于angle轴
    color: dimensions.slice(1).map((item) => item.id), // 第二个之后的维度用于颜色
    detail: dimensions.slice(1).map((item) => item.id), // 第二个之后的维度进行细分
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }

  return { ...advancedVSeed, encoding: mergedEncoding }
}
