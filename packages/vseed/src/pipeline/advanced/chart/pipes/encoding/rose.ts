import { unique } from 'remeda'
import { MeasureName } from 'src/dataReshape'
import type { AdvancedPipe, Encoding, Rose } from 'src/types'

export const encodingForRose: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Rose
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
  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)

  const mergedEncoding: Encoding = {
    angle: dimensions.slice(0, 1).map((item) => item.id), // 第一个维度放置于angle轴
    color: dimensions.slice(onlyMeasureName ? 0 : 1).map((item) => item.id), // 第二个之后的维度用于颜色
    detail: dimensions.slice(onlyMeasureName ? 0 : 1).map((item) => item.id),
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }
  return { ...advancedVSeed, encoding: mergedEncoding }
}
