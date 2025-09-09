import { MeasureName } from 'src/dataReshape'
import type { AdvancedPipe, Encoding, Heatmap } from 'src/types'

export const encodingForHeatmap: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: Heatmap
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    const x = encoding.x || [dimensions[0].id]
    const y = encoding.y || [(dimensions[1] || dimensions[0]).id]
    return {
      ...advancedVSeed,
      encoding: {
        x,
        y,
        ...encoding,
      },
    }
  }

  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)

  const mergedEncoding: Encoding = {
    x: dimensions.slice(0, 1).map((item) => item.id), // 第一个用于X轴
    y: dimensions.slice(onlyMeasureName ? 0 : 1).map((item) => item.id), // 第二及其之后个用于Y轴
    color: dimensions.slice(0).map((item) => item.id), // 所有维度用于颜色
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }

  return { ...advancedVSeed, encoding: mergedEncoding }
}
