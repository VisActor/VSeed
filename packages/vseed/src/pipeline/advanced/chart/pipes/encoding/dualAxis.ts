import type { AdvancedPipe, DualAxis, Encoding } from 'src/types'

export const encodingForDualAxis: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: DualAxis
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    const x = encoding.x || [dimensions[0].id]
    const color = encoding.color || []
    const detail = encoding.detail || []

    const mergedDetail = [...color.filter((d) => !x.includes(d)), ...detail]
    return {
      ...advancedVSeed,
      encoding: {
        ...encoding,
        x,
        color,
        detail: mergedDetail,
      } as Encoding,
    }
  }

  const mergedEncoding: Encoding = {
    x: dimensions.slice(0, 1).map((item) => item.id), // 第一个维度放置于X轴
    color: dimensions.slice(1).map((item) => item.id), // 第二个之后的维度用于颜色
    detail: dimensions.slice(1).map((item) => item.id), // 第二个之后的维度进行细分
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }

  return { ...advancedVSeed, encoding: mergedEncoding }
}
