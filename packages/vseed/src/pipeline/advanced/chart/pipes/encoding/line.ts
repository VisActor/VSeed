import { MeasureName } from 'src/dataReshape'
import type { AdvancedPipe, ColumnParallel, Encoding } from 'src/types'

export const encodingForLine: AdvancedPipe = (advancedVSeed, context) => {
  const { vseed } = context as {
    vseed: ColumnParallel
  }
  const { dimensions } = advancedVSeed
  if (!dimensions) {
    return advancedVSeed
  }

  const encoding = vseed.encoding

  if (encoding) {
    const x = encoding.x || [dimensions[0].id]
    const color = encoding.color || [(dimensions[1] || dimensions[0]).id]
    const detail = encoding.detail || []

    const mergedDetail =
      detail.length === 0 ? dimensions.map((d) => d.id).filter((id) => !x.includes(id)) : encoding.detail
    return {
      ...advancedVSeed,
      encoding: {
        ...encoding,
        x,
        color,
        detail: mergedDetail,
      },
    }
  }
  const onlyMeasureName = dimensions.length === 1 && dimensions.find((item) => item.id === MeasureName)

  const mergedEncoding: Encoding = {
    x: dimensions.slice(0, 1).map((item) => item.id), // 第一个维度放置于X轴
    color: dimensions.slice(onlyMeasureName ? 0 : 1).map((item) => item.id), // 第二个之后的维度用于颜色
    detail: dimensions.slice(onlyMeasureName ? 0 : 1).map((item) => item.id),
    tooltip: dimensions.map((item) => item.id), // 展示所有维度
    label: [], // 默认不展示标签
    row: [], // 默认不进行行透视
    column: [], // 默认不进行列透视
  }

  return { ...advancedVSeed, encoding: mergedEncoding }
}
