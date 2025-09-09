import type { AdvancedPipe, Encoding, Pie } from 'src/types'

export const encodingForPie: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Pie
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    return {
      ...advancedVSeed,
      encoding: {
        ...encoding,
      },
    }
  }

  const mergedEncoding: Encoding = {
    color: dimensions.slice(0).map((item) => item.id), // 所有维度用于颜色
    detail: dimensions.slice(0).map((item) => item.id), // 所有维度用于细分
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }

  return { ...advancedVSeed, encoding: mergedEncoding }
}
