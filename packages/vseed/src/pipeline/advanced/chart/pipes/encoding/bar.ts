import { MeasureName } from 'src/dataReshape'
import type { AdvancedPipe, BarParallel, Encoding } from 'src/types'

export const encodingForBar: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: BarParallel
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    const y = encoding.y || []
    const detail = encoding.detail || []
    const color = encoding.color || []

    const mergedDetail = [...color.filter((d) => !y.includes(d)), ...detail]
    return {
      ...advancedVSeed,
      encoding: {
        ...encoding,
        detail: mergedDetail,
      },
    }
  }

  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)

  const mergedEncoding: Encoding = {
    y: dimensions.slice(0, 1).map((item) => item.id), // 第一个维度放置于Y轴
    color: dimensions.slice(1).map((item) => item.id), // 第二个之后的维度用于颜色
    detail: dimensions.slice(onlyMeasureName ? 0 : 1).map((item) => item.id),
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }

  return { ...advancedVSeed, encoding: mergedEncoding }
}
